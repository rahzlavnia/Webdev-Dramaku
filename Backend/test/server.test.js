const request = require('supertest');
const app = require('../server.js');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { image } = require('@cloudinary/url-gen/qualifiers/source');
const pool = require('../server.js');


describe('GET /api/test', () => {
    it('should respond with API is working!', async () => {
        const response = await request(app).get('/api/test');
        expect(response.text).toBe('API is working!');
        expect(response.status).toBe(200);
    });
});

// describe('POST /api/countries', () => {
//     it('should create a new country', async () => {
//         const newCountry = { name: 'Indonesia' };  

//         const response = await request(app)
//             .post('/api/countries')
//             .send(newCountry)  
//             .set('Accept', 'application/json');

//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('id');
//         expect(response.body.name).toBe(newCountry.name);  
//     });
// });

// describe('POST /api/movies', () => {
//     it('should create a new movie', async () => {
//         const newMovie = {
//             title: 'Movie Title',
//             alt_title: 'Alternative Title',
//             year: '2024', 
//             availability: 'Available',
//             synopsis: 'This is a movie synopsis',
//             trailer: 'http://trailer.url',
//             country_id: '1',
//             genres: ['1', '2'], 
//             awards: ['2'], 
//             actors: ['1', '2'], 
//             image: 'https://via.placeholder.com/200x300?text=No+Image+Available' 
//         };

//         const response = await request(app)
//             .post('/api/movies')
//             .send(newMovie) 
//             .set('Content-Type', 'application/json')
//             .set('Accept', 'application/json'); 

//         console.log(response.body); 

//         expect(response.statusCode).toBe(201); 
//         expect(response.body).toHaveProperty('id'); 
//         expect(response.body.title).toBe(newMovie.title); 
//     });
// });


// describe('GET /home/movies', () => {
//     it('should return a list of movies', async () => {
//         const response = await request(app).get('/home/movies');

//         expect(response.status).toBe(200);

//         expect(Array.isArray(response.body)).toBe(true);

//         if (response.body.length > 0) {
//             const movie = response.body[0];
//             expect(movie).toHaveProperty('id');
//             expect(movie).toHaveProperty('title');
//             expect(movie).toHaveProperty('year');
//             expect(movie).toHaveProperty('images');
//             expect(movie).toHaveProperty('country_name');
//             expect(movie).toHaveProperty('genres');
//             expect(movie).toHaveProperty('rating');
//             expect(movie).toHaveProperty('comments');
//             expect(movie).toHaveProperty('actors');
//             expect(movie).toHaveProperty('award');
//         }
//     });

//     it('should handle errors correctly', async () => {
//         pool.query.mockRejectedValue(new Error('Database error'));

//         const response = await request(app).get('/home/movies');

//         expect(response.status).toBe(500);
//         expect(response.body).toHaveProperty('message', 'Error fetching movies');
//       });
// });


describe('GET /movies/:id', () => {
    let movieId = 472; 

    it('should return movie details successfully', async () => {
        const response = await request(app).get(`/movies/${movieId}`);
        expect(response.status).toBe(200);
    });

    it('should return 404 if movie not found', async () => {
        movieId = 9999; 

        const response = await request(app).get(`/movies/${movieId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Movie not found');
    });
});

describe('DELETE /movies/:id', () => {
    let movieId = 473;

    it('should delete the movie and related data successfully', async () => {
        const response = await request(app).delete(`/movies/${movieId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Movie deleted successfully" });
    });
});

describe('PUT /movies/:id/approve', () => {
    let movieId = 472;

    it('should approve the movie successfully', async () => {
        const response = await request(app).put(`/movies/${movieId}/approve`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Movie approved successfully" });
    });
});