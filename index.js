// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // --- File paths ---
// const booksFile = path.join(__dirname, "books.json");
// const finesFile = path.join(__dirname, "fines.json");

// // --- Helper functions ---
// function readJSON(file) {
//   try {
//     const data = fs.readFileSync(file, "utf8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.error(`Error reading ${file}:`, err.message);
//     return [];
//   }
// }

// function writeJSON(file, data) {
//   try {
//     fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
//   } catch (err) {
//     console.error(`Error writing ${file}:`, err.message);
//   }
// }

// // --- Routes ---

// // Base route
// app.get("/", (req, res) => {
//   res.send("Library Management Backend is running 🚀");
// });

// // Get all books
// app.get("/api/books", (req, res) => {
//   const books = readJSON(booksFile);
//   res.json(books);
// });

// // Add a new book
// app.post("/api/books", (req, res) => {
//   const { title, author, genre, availability } = req.body;

//   if (!title || !author || !genre || !availability) {
//     return res.status(400).json({ message: "All book fields are required!" });
//   }

//   const books = readJSON(booksFile);
//   const newBook = {
//     id: books.length ? books[books.length - 1].id + 1 : 1,
//     title,
//     author,
//     genre,
//     availability
//   };
//   books.push(newBook);
//   writeJSON(booksFile, books);
//   res.status(201).json({ message: "Book added successfully!", book: newBook });
// });

// // Get all fines
// app.get("/api/fines", (req, res) => {
//   const fines = readJSON(finesFile);
//   res.json(fines);
// });

// // Add a fine record
// app.post("/api/fines", (req, res) => {
//   const { borrower, title, issued, returned, fine } = req.body;

//   if (!borrower || !title || !issued || !returned || fine === undefined) {
//     return res.status(400).json({ message: "All fine fields are required!" });
//   }

//   const fines = readJSON(finesFile);
//   const newFine = { borrower, title, issued, returned, fine };
//   fines.push(newFine);
//   writeJSON(finesFile, fines);
//   res.status(201).json({ message: "Fine record added successfully!", fine: newFine });
// });

// // --- Start server ---
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



// import express from "express"

// const app = express()

// app.get("/",(req,res)=>{
//   res.send("Server is ready")
// })

// const port = process.env.PORT || 3000

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// For ES modules, __dirname is not defined — so define it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- File paths ---
const booksFile = path.join(__dirname, "books.json");
const finesFile = path.join(__dirname, "fines.json");

// --- Helper functions ---
function readJSON(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
    return [];
  }
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Error writing ${file}:`, err.message);
  }
}

// --- Routes ---

// Base route
app.get("/", (req, res) => {
  res.send("Library Management Backend is running 🚀");
});

// Get all books
app.get("/api/books", (req, res) => {
  const books = readJSON(booksFile);
  res.json(books);
});

// Add a new book
app.post("/api/books", (req, res) => {
  const { title, author, genre, availability } = req.body;

  if (!title || !author || !genre || !availability) {
    return res.status(400).json({ message: "All book fields are required!" });
  }

  const books = readJSON(booksFile);
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    genre,
    availability
  };
  books.push(newBook);
  writeJSON(booksFile, books);
  res.status(201).json({ message: "Book added successfully!", book: newBook });
});

// Get all fines
app.get("/api/fines", (req, res) => {
  const fines = readJSON(finesFile);
  res.json(fines);
});

// Add a fine record
app.post("/api/fines", (req, res) => {
  const { borrower, title, issued, returned, fine } = req.body;

  if (!borrower || !title || !issued || !returned || fine === undefined) {
    return res.status(400).json({ message: "All fine fields are required!" });
  }

  const fines = readJSON(finesFile);
  const newFine = { borrower, title, issued, returned, fine };
  fines.push(newFine);
  writeJSON(finesFile, fines);
  res.status(201).json({ message: "Fine record added successfully!", fine: newFine });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
