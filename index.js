const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// --- In-memory database ---
let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", availability: "Available" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", availability: "Issued" },
  { id: 3, title: "A Brief History of Time", author: "Stephen Hawking", genre: "Science", availability: "Available" },
  { id: 4, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", genre: "Biography", availability: "Available" },
  { id: 5, title: "The Art of War", author: "Sun Tzu", genre: "History", availability: "Issued" }
];

let fines = [
  { borrower: "Poonam Pawar", title: "Harry Potter", issued: "2025-09-20", returned: "2025-10-05", fine: 0 },
  { borrower: "Dhanshree Sonawane", title: "The Alchemist", issued: "2025-09-15", returned: "2025-10-02", fine: 50 }
];

// --- Routes ---

// Base route
app.get("/", (req, res) => {
  res.send("Library Management Backend is running 🚀");
});

// Get all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Add a new book
app.post("/api/books", (req, res) => {
  const { title, author, genre, availability } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    availability
  };
  books.push(newBook);
  res.json({ message: "Book added successfully!" });
});

// Get all fines
app.get("/api/fines", (req, res) => {
  res.json(fines);
});

// Add a fine record
app.post("/api/fines", (req, res) => {
  const { borrower, title, issued, returned, fine } = req.body;
  fines.push({ borrower, title, issued, returned, fine });
  res.json({ message: "Fine record added successfully!" });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
