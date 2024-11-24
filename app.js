const express = require('express');
const mariadb = require('mariadb');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure database connection
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'your_new_password', 
    database: 'guestbook' 
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Connect to the database
async function connect() {
    try {
        return await pool.getConnection();
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', async (req, res) => {
    const { fname, lname, jobt, comp, linkin, email, meet, msg } = req.body;

    const conn = await connect();
    try {
        await conn.query(
            'INSERT INTO entries (fname, lname, jobt, comp, linkin, email, meet, msg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [fname, lname, jobt, comp, linkin, email, meet, msg]
        );
        res.render('success');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.send('Error saving your submission. Please try again.');
    } finally {
        if (conn) conn.end();
    }
});

app.get('/admin', async (req, res) => {
    const conn = await connect();
    try {
        const rows = await conn.query('SELECT * FROM entries ORDER BY created_at DESC');
        res.render('admin', { entries: rows });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.send('Error loading submissions. Please try again.');
    } finally {
        if (conn) conn.end();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
