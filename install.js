let { Client } = require('pg');
require('dotenv').config();

// Anslut till databasen
let client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
});

client.connect((err) => {
    if(err) {
        console.log('Fel vid anslutnin: ' + err);
    } else {
        console.log('Ansluten till databasen');
    }
});

// Skapar kurstabell
client.query(`
    DROP TABLE IF EXISTS courses;
    CREATE TABLE courses(
        id SERIAL PRIMARY KEY,
        coursecode TEXT,
        coursename TEXT, 
        progression TEXT,
        syllabus TEXT,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );    
`);
