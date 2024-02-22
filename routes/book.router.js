const express = require('express');
const { getAllBooks, createBook, updateBookDetail, deleteBook } = require('../controllers/book.controller');



const router = express.Router()

router.get('/book', getAllBooks);
router.post('/book', createBook);
router.put('/book/:id', updateBookDetail);
router.delete('/book/:id', deleteBook)

module.exports = router;