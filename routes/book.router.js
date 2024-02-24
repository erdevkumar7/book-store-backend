const express = require('express');
const { getAllBooks, createBook, updateBookDetail, deleteBook } = require('../controllers/book.controller');

const router = express.Router()

// User can get and serach Books
router.post('/books', getAllBooks);

// Admin can CRUD book
router.post('/book', createBook);
router.put('/book/:id', updateBookDetail);
router.delete('/book/:id', deleteBook)

module.exports = router;