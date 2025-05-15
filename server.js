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
app.get('/', async(req, res) => {
    // Läs kurser in från databasen
    client.query('SELECT * FROM courses ORDER BY added_at DESC;', (err, courses) => {
        if(err) {
            console.log('Fel vid db-fråga');
        } else {
            res.render('index', {
                courses: courses.rows
            });
        }
    });
});

app.get('/add-courses', async(req, res) => {
    res.render('add-courses', {
        error: ''
    });
});

// Spara inmatade kurser till databasen
app.post('/add-courses', async(req, res) => {
    let coursecode = req.body.coursecode;
    let coursename = req.body.coursename;
    let progression = req.body.progression;
    let link = req.body.link;
    let inputArray = [coursecode, coursename, progression, link];
    let error = '';
    
    
    // Kontrollerar att kurskod är unik inte finns redan i tabellen och att progression är endast A, B eller C, dessutom att skicka felmeddelande beroende på felet
    client.query('SELECT * FROM courses;', (err, courses) => {
        if(err) {
            console.log('Fel vid db-fråga ' + err);
        } else if((courses.rows.every(course => course.coursecode.toLowerCase() !== coursecode.toLowerCase())) && (progression === 'A' || progression === 'B' || progression === 'C') && (coursecode !== '' || coursename !== '' || progression !== '' || link !== '')) {
            let result = client.query('INSERT INTO courses(coursecode, coursename, progression, syllabus)VALUES($1, $2, $3, $4)', inputArray);
            res.redirect('/');
        } else if(coursecode === '' || coursename === '' || progression === '' || link === '') {
            res.render('add-courses', {
                error: 'Du måste fylla alla fält'
            });
        } else if((!courses.rows.every(course => course.coursecode.toLowerCase() !== coursecode.toLowerCase())) && (progression !== 'A' && progression !== 'B' && progression !== 'C')) {
            res.render('add-courses', {
                error: 'Kurskod skall vara unik, och Progression måste vara endast A, B eller C!'
            });
        }else if(!courses.rows.every(course => course.coursecode.toLowerCase() !== coursecode.toLowerCase())) {
            
            res.render('add-courses', {
                error: 'Kurskod skall vara unik!'
            });
        } else if(progression !== 'A' && progression !== 'B' && progression !== 'C') {
            res.render('add-courses', {
                error: 'Progression måste vara endast A, B eller C!'
            });
        }
    
    });
    
});

app.get('/about', async(req, res) => {
    res.render('about');
});

// Ta bort kurs från tabellen
app.get('/delete/:id', (req, res) => {
    let id = req.params.id;

    // Radera kurs
    client.query(`DELETE FROM courses WHERE id=$1;`, [id], (err) => {
        if(err) {
            console.error(err.message);
        }

        // Redirect till startsida
        res.redirect('/');
    });
});

// Starta servern
app.listen(process.env.PORT, () => {
    console.log('Servern startas på port: ' + process.env.PORT);
});