let express = require('express');
let { Client } = require('pg');
require('dotenv').config();

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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

// Routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add-courses', (req, res) => {
    res.render('add-courses');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Starta servern
app.listen(process.env.PORT, () => {
    console.log('Servern startas på port: ' + process.env.PORT);
});