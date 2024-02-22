const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_name: {
    type: String,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  user_cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Assuming 'Book' is the name of your Book model
    },
  ],
});

const User = mongoose.model("user_details", schema);

module.exports = User;
