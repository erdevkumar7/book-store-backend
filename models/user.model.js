const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user_name: String,
    user_email: String,
    user_password: String,
})

const User = mongoose.model('user_details', schema);

module.exports = User;