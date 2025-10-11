const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // replace with your MySQL username
  password: 'password',// replace with your MySQL password
  database: 'library'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected ✅');
});

// API: Get all books
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API: Add new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, availability } = req.body;
  db.query(
    'INSERT INTO books (title, author, genre, availability) VALUES (?, ?, ?, ?)',
    [title, author, genre, availability],
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Book added successfully', id: results.insertId });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
