const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/book-store_db')
.then(()=>{console.log('Database connected ...')});

const db = {};

db.User = require('./user.model');
// db.Theater = require('./theater.model');

module.exports = db;