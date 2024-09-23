const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "Aziiz_4321",
  database: "postgres",
  host: "localhost",
  port: 5432,
  max: 10,
});

app.get("/movies", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          m.id,
          m.title,
          m.alt_title,
          m.year,
          m.synopsis,
          m.images,  
          array_agg(g.name) AS genres
        FROM
          movies m
        JOIN
          movie_genre mg ON m.id = mg.movie_id
        JOIN
          genres g ON mg.genre_id = g.id
        GROUP BY
          m.id;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).send("Server error");
    }
  });
  

  app.get("/movies/:id", async (req, res) => {
    const { id } = req.params;
  
    // Validasi bahwa id harus berupa angka
    if (isNaN(id)) {
      return res.status(400).send("Invalid movie ID");
    }
  
    try {
      const result = await pool.query(`
        SELECT 
          m.id,
          m.title,
          m.alt_title,
          m.synopsis,
          m.year,
          m.availability,
          m.trailer,
          m.images,
          m.status,
          array_agg(g.name) AS genres,
          json_agg(
            json_build_object(
              'user', u.username,
              'text', c.comment,
              'rating', c.status,
              'date', c.created_at
            )
          ) AS comments
        FROM 
          movies m
        LEFT JOIN 
          movie_genre mg ON m.id = mg.movie_id
        LEFT JOIN 
          genres g ON mg.genre_id = g.id
        LEFT JOIN 
          comments c ON c.movie_id = m.id
        LEFT JOIN 
          users u ON u.username = c.user_username
        WHERE 
          m.id = $1
        GROUP BY 
          m.id;
      `, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).send("Movie not found");
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      res.status(500).send("Server error");
    }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running successfully on port: ${port}`);
});
