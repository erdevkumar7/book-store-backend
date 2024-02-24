const db = require("../models/index.model");
const Book = db.Book;

// Admin can create book
exports.createBook = async (req, res) => {
  try {
    const BookCreated = await Book.create(req.body);
    res.status(201).json(BookCreated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books and book by title if title in req.body
exports.getAllBooks = async (req, res) => {
  try {
    const { search } = req.params;
    const { author, category } = req.body;

    let query = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query.title = regex;
    } else if (author) {
      query.author = author;
    } else if (category && author === 0) {
      query.category = category;
    } else if (author && category === 0){
      query.author = author;
      query.category = category;
    }

    // Find books based on the query
    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin can update the book
exports.updateBookDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the book by its _id and delete it
    const deletedBook = await Book.findOneAndDelete({ _id: id });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Return error if something goes wrong
  }
};
