// Import required modules
import express, { json } from 'express';
import { connect, model } from 'mongoose';

// Initialize Express app
const app = express();
app.use(json());

// Connect to MongoDB
connect('mongodb://localhost/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Book model
const Book = model('Book', {
  title: String,
  author: String,
  isbn: String,
});

// API endpoints
// Fetch all the books
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a new book
app.post('/api/books', async (req, res) => {
  const { title, author, isbn } = req.body;
  const book = new Book({ title, author, isbn });
  await book.save();
  res.json(book);
});

// Delete a book by ISBN
app.delete('/api/books/:isbn', async (req, res) => {
  const { isbn } = req.params;
  await Book.findOneAndDelete({ isbn });
  res.json({ message: 'Book deleted' });
});

// Start the server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
