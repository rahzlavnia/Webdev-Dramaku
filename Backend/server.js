const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3005;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const fs = require('fs');
const cloudinary = require('cloudinary').v2; // Cloudinary SDK

// Setup CORS to allow frontend access
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dtk2yqead',
  api_key: '417426998347937',
  api_secret: 'nhiBmTCI347fdl2BLyHrW7moYTE',
});


const upload = multer({ storage: multer.memoryStorage() }); // Using memory storage for direct upload to Cloudinary

// PostgreSQL connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Aziiz_4321',
  port: 5432,
});

const client = new OAuth2Client("193966095713-ooq3r03aaanmf67tudroa67ccctfqvk6.apps.googleusercontent.com");

// Middleware untuk autentikasi token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

// Set storage engine
// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT username, password, role_id FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role_id },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role_id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
});

// Fungsi untuk verifikasi token Google
async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: "193966095713-ooq3r03aaanmf67tudroa67ccctfqvk6.apps.googleusercontent.com", // Ganti dengan client ID milikmu
  });
  return ticket.getPayload(); // Payload akan berisi informasi pengguna
}

// Endpoint untuk Google Login
app.post("/google-login", async (req, res) => {
  try {
    const googleToken = req.body.token; // Ubah nama variabel agar tidak ada konflik

    const googleUser = await verifyGoogleToken(googleToken);

    let user = await pool.query("SELECT * FROM users WHERE google_id = $1", [googleUser.sub]);

    if (user.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (username, email, google_id, role_id) VALUES ($1, $2, $3, 'Writer')",
        [googleUser.name, googleUser.email, googleUser.sub]
      );

      user = await pool.query("SELECT * FROM users WHERE google_id = $1", [googleUser.sub]);
    }

    const jwtToken = jwt.sign(
      { username: user.rows[0].username, role: user.rows[0].role_id },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ token: jwtToken, role: user.rows[0].role_id });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).send("Server error during Google login");
  }
});

// Endpoint untuk registrasi
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body; // Ambil username, email, dan password dari request body
  let role;

  // Tentukan role berdasarkan domain email
  if (email.endsWith("@admindramaku.com")) {
    role = "Admin";
  } else if (email.endsWith("@gmail.com")) {
    role = "Writer"; // Atau "Reader" 
  } else {
    return res.status(400).json({ message: "Invalid email domain" }); // Email tidak valid
  }

  try {
    // Cek apakah username sudah ada
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database
    await pool.query(
      "INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, $4)",
      [username, email, hashedPassword, role] // Gunakan role yang ditentukan
    );

    res.status(201).json({ message: "User registered successfully", role });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Server error");
  }
});

app.get("/movies", async (req, res) => {
  try {
    const query = `
      SELECT m.id, m.title, m.year, m.images, m.synopsis, m.availability, m.country_id,
            (SELECT string_agg(g.name, ', ') FROM movie_genre mg 
              JOIN genres g ON g.id = mg.genre_id WHERE mg.movie_id = m.id) as genre,
            (SELECT avg(c.rate) FROM comments c WHERE c.movie_id = m.id AND c.status = '1') as rating,
            0 as views,
            (SELECT string_agg(w.name || ' (' || w.year || ')', ', ') 
            FROM movie_award md 
            JOIN awards w ON w.id = md.award_id 
            WHERE md.movie_id = m.id AND w.year IS NOT NULL) as award
      FROM movies m
      ORDER BY m.id ASC;
    `;
    const movies = await pool.query(query);

    // Log data to check for duplicates
    console.log(movies.rows);

    res.json(movies.rows); // Send all movies at once
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching movies' });
  }
});


app.get('/movies/:id', async (req, res) => {
  const movieId = parseInt(req.params.id);

  try {
    const query = `
    SELECT m.id, m.title, m.year, m.images, m.synopsis, m.trailer, m.alt_title, m.availability,
          (SELECT string_agg(g.name, ', ') 
            FROM movie_genre mg 
            JOIN genres g ON g.id = mg.genre_id 
            WHERE mg.movie_id = m.id) as genres,
          (SELECT avg(c.rate) 
            FROM comments c 
            WHERE c.movie_id = m.id AND c.status = '1') as rating,
          (SELECT json_agg(json_build_object('user', c.username, 'text', c.comment, 'rating', c.rate, 'date', c.created_at)) 
            FROM comments c 
            WHERE c.movie_id = m.id AND c.status = '1') as comments,
            (SELECT json_agg(json_build_object('name', a.name, 'url_photos', a.url_photos)) 
             FROM movie_actor ma
             JOIN actors a ON a.id = ma.actor_id 
             WHERE ma.movie_id = m.id) AS actors,
          (SELECT string_agg(w.name || ' (' || w.year || ')', ', ') 
            FROM movie_award md 
            JOIN awards w ON w.id = md.award_id 
            WHERE md.movie_id = m.id AND w.year IS NOT NULL) as awards
      FROM movies m
      WHERE m.id = $1;
    `;

    const result = await pool.query(query, [movieId]);

    console.log('Result:', result.rows); // Debugging output

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(result.rows[0]); // Return the movie details as a JSON response
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/search', async (req, res) => {
  const searchTerm = req.query.term || ''; // Get the 'term' parameter from the query

  // Define a list of stop words to ignore in the search
  const stopWords = [
    'the', 'of', 'a', 'an', 'in', 'and', 'to', 'for', 'is',
    'at', 'by', 'on', 'with', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'th', 'wi'
  ];

  // Filter out stop words from the search term
  const filteredTerm = searchTerm
    .toLowerCase()
    .split(' ')
    .filter(word => !stopWords.includes(word) && word.trim() !== '')
    .join(' ');

  // Check if the filtered term is empty
  if (!filteredTerm) {
    return res.json([]); // Return an empty array if no valid search term remains
  }

  const formattedSearchTermWithWordBoundary = `\\m${filteredTerm}`; // Match the beginning of a word
  const formattedSearchTermWithoutLeadingWildcard = `${filteredTerm}%`; // Format for SQL LIKE with trailing wildcard only

  try {
    // SQL query to search based on title and actor's name using regex for precise title matching
    const query = `
      SELECT DISTINCT m.id, m.title, m.year, m.images, m.synopsis, m.country_id
        (SELECT string_agg(g.name, ', ') 
         FROM movie_genre mg
         JOIN genres g ON g.id = mg.genre_id
         WHERE mg.movie_id = m.id) AS genre,
        (SELECT AVG(c.rate)
         FROM comments c 
         WHERE c.movie_id = m.id AND c.status = '1') AS rating,
        (SELECT string_agg(a.name, ', ')
         FROM movie_actor ma
         JOIN actors a ON a.id = ma.actor_id 
         WHERE ma.movie_id = m.id) AS actors
      FROM movies m
      LEFT JOIN movie_actor ma ON ma.movie_id = m.id
      LEFT JOIN actors a ON a.id = ma.actor_id
      WHERE LOWER(m.title) ~* $1  -- Using PostgreSQL regex matching for precise title search
        OR LOWER(REGEXP_REPLACE(a.name, '[ -]', '', 'g')) LIKE $2
      GROUP BY m.id
      ORDER BY m.id ASC;
    `;

    const movies = await pool.query(query, [formattedSearchTermWithWordBoundary, formattedSearchTermWithoutLeadingWildcard]);

    res.json(movies.rows);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Error fetching search results' });
  }
});

app.get('/suggestions', async (req, res) => {
  const searchTerm = req.query.term || '';
  const formattedSearchTerm = `${searchTerm.toLowerCase()}%`; // For SQL LIKE

  console.log('Formatted Search Term:', formattedSearchTerm); // Log the search term

  try {
    const query = `
      SELECT title FROM movies
      WHERE LOWER(title) LIKE $1
      ORDER BY title ASC
      LIMIT 10; 
    `;

    const result = await pool.query(query, [formattedSearchTerm]);
    const titles = result.rows.map(row => row.title);
    res.json(titles); // Return the array of titles
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Error fetching suggestions', error: error.message }); // Include error details
  }
});


app.get('/api/genres', async (req, res) => {
  try {
    const query = 'SELECT id, name FROM genres ORDER BY name ASC;';
    const result = await pool.query(query);
    const genres = result.rows; // Ambil semua genre dari query

    res.json(genres); // Mengembalikan array genre
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Error fetching genres', error: error.message }); // Detail error
  }
});

app.get('/countries', async (req, res) => {
  try {
    const query = 'SELECT id, name FROM countries ORDER BY name ASC;';
    const result = await pool.query(query);
    const countries = result.rows;

    res.json(countries); 
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Error fetching countries', error: error.message }); // Detail error
  }
});

// app.get('/api/awards', async (req, res) => {
//   try {
//     const query = 'SELECT id, name, year FROM awards WHERE year IS NOT NULL ORDER BY name ASC;';
//     const result = await pool.query(query);
//     const awards = result.rows;

//     res.json(awards);
//   } catch (error) {
//     console.error('Error fetching awards:', error);
//     res.status(500).json({ message: 'Error fetching awards', error: error.message });
//   }
// });

// Endpoint untuk menambahkan komentar
app.post('/movies/:id/comments', authenticateToken, async (req, res) => {
  const movieId = parseInt(req.params.id);
  const { commentText, rating, status } = req.body; // Ambil status dari request body
  const userName = req.user.username; // Ambil username dari token yang terautentikasi

  if (!commentText || !rating) {
    return res.status(400).json({ message: "Comment text and rating are required." });
  }

  try {
    // Insert komentar ke database
    await pool.query(
      "INSERT INTO comments (movie_id, username, comment, rate, status) VALUES ($1, $2, $3, $4, $5)", // Ubah query untuk menggunakan $5 untuk status
      [movieId, userName, commentText, rating, status] // Tambahkan status di akhir array
    );

    res.status(201).json({ message: "Comment added successfully." });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error while adding comment." });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// // Endpoint untuk mendapatkan semua negara
// app.get("/countries", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT id, name FROM Countries");
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     res.status(500).send("Server error");
//   }
// });

// Endpoint untuk mendapatkan semua awards
app.get("/awards", async (req, res) => {
  try {
    const result = await pool.query("SELECT awards.id, Countries.name AS country, awards.name AS award, awards.year FROM awards JOIN Countries ON awards.country_id = Countries.id;"); // Ganti dengan query sesuai struktur database Anda
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching awards:", error);
    res.status(500).send("Server error");
  }
});

app.post("/awards", async (req, res) => {
  const { awards, year, country_id } = req.body;

  try {
    // Validate `country_id`
    console.log("Received data:", req.body);
    const countryExists = await pool.query("SELECT 1 FROM countries WHERE id = $1", [country_id]);

    if (countryExists.rowCount === 0) {
      return res.status(400).send("Invalid country_id. Please select a valid country.");
    }

    // Insert the award and log result
    const result = await pool.query(
      "INSERT INTO awards (name, year, country_id) VALUES ($1, $2, $3) RETURNING *",
      [awards, year, country_id] // Ganti name dengan awards
    );
    

    console.log("Insert result:", result.rows[0]); // Log the inserted row
    res.send("Award created successfully");
  } catch (error) {
    if (error.code === '23503') {
      res.status(400).send("Foreign key constraint error: Invalid country_id.");
    } else {
      console.error("Error creating award:", error);
      res.status(500).send("Server error");
    }
  }
});


app.put("/awards/:id", async (req, res) => {
  const { id } = req.params;
  const { country_id, name, year } = req.body;

  try {
    await pool.query(
      "UPDATE awards SET country_id = $1, name = $2, year = $3 WHERE id = $4",
      [country_id, name, year, id]
    );
    res.send("Award updated successfully");
  } catch (error) {
    console.error("Error updating award:", error);
    res.status(500).send("Server error");
  }
});


app.delete("/awards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Hapus data terkait dari tabel movie_award terlebih dahulu
    await pool.query("DELETE FROM movie_award WHERE award_id = $1", [id]);
    // Lalu hapus dari tabel awards
    await pool.query("DELETE FROM awards WHERE id = $1", [id]);
    res.send("Award deleted successfully");
  } catch (error) {
    console.error("Error deleting award:", error);
    res.status(500).send("Server error");
  }
});

// Endpoint to get all actors with country names
app.get('/actors', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.id, a.name, a.birthdate, a.url_photos, c.name AS country_name
      FROM actors a
      JOIN countries c ON a.country_id = c.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching actors:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Endpoint to add a new actor
app.post('/actors', upload.single('photo'), async (req, res) => {
  const { country_id, name, birth_date } = req.body;

  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    // Upload the image to Cloudinary and get the URL
    const url_photos = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url); // Capture the secure URL from the result
      });
      uploadStream.end(req.file.buffer); // Pass the file buffer to Cloudinary
    });

    // Insert the actor into the database
    const result = await pool.query(
      'INSERT INTO actors (country_id, name, birthdate, url_photos) VALUES ($1, $2, $3, $4) RETURNING *',
      [country_id, name, birth_date, url_photos]
    );

    return res.json({ success: true, actor: result.rows[0] });
  } catch (error) {
    console.error('Error inserting actor:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Endpoint to update an actor
app.put('/actors/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { country_id, name, birth_date } = req.body;
  let url_photos = null;

  try {
    if (req.file) {
      // Upload to Cloudinary if a new photo is provided
      const cloudinaryResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(new Error('Cloudinary upload error'));
          }
          resolve(result.secure_url);
        }).end(req.file.buffer); // Use the file buffer from multer
      });
      url_photos = cloudinaryResult;
    }

    await pool.query(
      'UPDATE actors SET country_id = $1, name = $2, birthdate = $3, url_photos = COALESCE($4, url_photos) WHERE id = $5',
      [country_id, name, birth_date, url_photos, id]
    );

    res.json({ success: true, message: 'Actor updated' });
  } catch (error) {
    console.error('Error updating actor:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Endpoint to delete an actor
app.delete('/actors/:id', async (req, res) => {
  const { id } = req.params;

  try {

    await pool.query("DELETE FROM movie_actor WHERE actor_id = $1", [id]);
    await pool.query('DELETE FROM actors WHERE id = $1', [id]);
    res.json({ success: true, message: 'Actor deleted' });
  } catch (error) {
    console.error('Error deleting actor:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Updated GET endpoint to fetch comments with movie titles
app.get("/comments", async (req, res) => {
  try {
    const { searchTerm = "", shows = 10 } = req.query;
    const result = await pool.query(
      `SELECT comments.id, comments.comment, comments.status, comments.rate, 
              comments.username, comments.created_at, movies.title AS drama 
       FROM comments 
       JOIN movies ON comments.movie_id = movies.id 
       WHERE comments.username ILIKE $1 
       LIMIT $2`,
      [`%${searchTerm}%`, shows]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Server error");
  }
});


// Add a new comment
app.post("/comments", async (req, res) => {
  const { username, rate, drama, comments, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comments (username, rate, drama, comments, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, rate, drama, comments, status]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Server error");
  }
});

app.put("/comments/:id", async (req, res) => {
  const { id } = req.params; // This should be a string
  const { status } = req.body; // Make sure to only take status
  try {
    const result = await pool.query(
      "UPDATE comments SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating comment:", error.message); // Log detailed error
    res.status(500).send("Server error");
  }
});


// Delete comments
app.delete("/comments", async (req, res) => {
  const { ids } = req.body; // Expecting an array of IDs
  try {
    await pool.query("DELETE FROM comments WHERE id = ANY($1)", [ids]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting comments:", error);
    res.status(500).send("Server error");
  }
});

