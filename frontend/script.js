const backendURL = "http://localhost:5000/api";

/* --- Book Management --- */

const bookTableBody = document.querySelector("#book-list tbody");

// Render books function
function renderBooks(books) {
  bookTableBody.innerHTML = "";
  books.forEach(book => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.availability}</td>
    `;
    bookTableBody.appendChild(tr);
  });
}

// Fetch books from backend on page load
fetch(`${backendURL}/books`)
  .then(res => res.json())
  .then(data => renderBooks(data));

// Add new book
document.querySelector("#add-book form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = this.querySelector('input[placeholder="Book Title"]').value;
  const author = this.querySelector('input[placeholder="Author"]').value;
  const genre = this.querySelector('input[placeholder="Genre"]').value;
  const availability = this.querySelector('select').value;

  fetch(`${backendURL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, genre, availability })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      this.reset();
      return fetch(`${backendURL}/books`);
    })
    .then(res => res.json())
    .then(data => renderBooks(data));
});

/* --- Search Book --- */
document.querySelector("#search-book form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = this.querySelector('input').value.toLowerCase();
  const genre = this.querySelector('select').value;

  fetch(`${backendURL}/books`)
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(book =>
        (book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)) &&
        (genre === "" || book.genre.toLowerCase() === genre.toLowerCase())
      );
      renderBooks(filtered);
    });
});

/* --- Fine Management --- */
const fineTableBody = document.querySelector("#fine-management tbody");

function renderFines(fines) {
  fineTableBody.innerHTML = "";
  fines.forEach(f => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.borrower}</td>
      <td>${f.title}</td>
      <td>${f.issued}</td>
      <td>${f.returned}</td>
      <td>${f.fine}</td>
    `;
    fineTableBody.appendChild(tr);
  });
}

// Fetch fines from backend
fetch(`${backendURL}/fines`)
  .then(res => res.json())
  .then(data => renderFines(data));

// Add fine record
document.querySelector("#fine-management form").addEventListener("submit", function (e) {
  e.preventDefault();
  const borrower = this.querySelector('input[placeholder="Borrower Name"]').value;
  const title = this.querySelector('input[placeholder="Book Title"]').value;
  const issued = this.querySelector('input[placeholder="Issued Date"]').value;
  const returned = this.querySelector('input[placeholder="Return Date"]').value;
  const fine = Number(this.querySelector('input[placeholder="Fine Amount (₹)"]').value);

  fetch(`${backendURL}/fines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ borrower, title, issued, returned, fine })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      this.reset();
      return fetch(`${backendURL}/fines`);
    })
    .then(res => res.json())
    .then(data => renderFines(data));
});
