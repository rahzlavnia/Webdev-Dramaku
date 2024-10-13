const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3005;

// Setup CORS to allow frontend access
app.use(cors());

// PostgreSQL connection details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Dramaku',
    password: 'newpassword',
    port: 5432,
});

app.get('/api/movies', async (req, res) => {
  try {
    const query = `
      SELECT m.id, m.title, m.year, m.images, m.synopsis,
            (SELECT string_agg(g.name, ', ') FROM movie_genre mg 
              JOIN genres g ON g.id = mg.genre_id WHERE mg.movie_id = m.id) as genre,
            (SELECT avg(c.rate) FROM comments c WHERE c.movie_id = m.id AND c.status = '1') as rating,
            0 as views
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
            WHERE ma.movie_id = m.id) AS actors
      FROM movies m
      WHERE m.id = $1;
    `;

    const result = await pool.query(query, [movieId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(result.rows[0]); // Return the movie details as a JSON response
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/search', async (req, res) => {
  const searchTerm = req.query.term || ''; // Ambil parameter 'term' dari query
  const formattedSearchTerm = `%${searchTerm.toLowerCase()}%`; // Format untuk SQL LIKE dengan wildcard

  try {
    // Query untuk mencari berdasarkan judul dan aktor
    const query = `
      SELECT DISTINCT m.id, m.title, m.year, m.images, m.synopsis,
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
              WHERE ma.movie_id = m.id) AS actors,
            0 AS views
      FROM movies m
      LEFT JOIN movie_actor ma ON ma.movie_id = m.id
      LEFT JOIN actors a ON a.id = ma.actor_id
      WHERE LOWER(m.title) LIKE $1 OR LOWER(REGEXP_REPLACE(a.name, '[ -]', '', 'g')) LIKE  $1
      GROUP BY m.id
      ORDER BY m.id ASC;
    `;

    const movies = await pool.query(query, [formattedSearchTerm]);
   
    res.json(movies.rows);

  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Error fetching search results' });
  }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
