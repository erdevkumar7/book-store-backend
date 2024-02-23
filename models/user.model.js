const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Assuming 'Book' is the name of your Book model
    },
  ],
});

const User = mongoose.model("user_details", schema);

module.exports = User;
