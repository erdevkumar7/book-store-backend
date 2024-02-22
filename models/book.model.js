const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
});

const Book = mongoose.model("book_details", bookSchema);

module.exports = Book;
