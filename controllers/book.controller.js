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
    const { title } = req.body;
    if (title) {
      const getBookByName = await Book.find({ title: title });
      res.status(200).json(getBookByName);
    } else {
      const getAllBooksData = await Book.find({});
      res.status(200).json(getAllBooksData);
    }
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
