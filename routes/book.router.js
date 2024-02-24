const express = require('express');
const { getAllBooks, createBook, updateBookDetail, deleteBook } = require('../controllers/book.controller');
const { webProtection } = require('../middleware/web.protection');

const router = express.Router()

// User can get and serach Books
router.post('/books/:search?', webProtection, getAllBooks);

// Admin can CRUD book
router.post('/book', webProtection, createBook);
router.put('/book/:id', webProtection, updateBookDetail);
router.delete('/book/:id', webProtection, deleteBook)

module.exports = router;