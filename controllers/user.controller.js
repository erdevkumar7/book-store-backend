const {
  hashPassword,
  isValidPassword,
  generateToken,
} = require("../helper/auth");
const db = require("../models/index.model");
const User = db.User;

// User signUp
exports.registration = async (req, res) => {
  const { email, password } = req.body;
  // Check for email and passowrd
  if (!(password && email)) {
    res.status(401).json({ message: "Email and Password Must Required" });
  } else {
    // check for existing user
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      res.status(400).json("Email already Registered!");
    }

    // Register new user
    if (!findUser) {
      const userCreated = await User.create({
        ...req.body,
        password: await hashPassword(password), //hashing password
      });
      res.status(201).json(userCreated);
    }
  }
};

// Login the user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check for email and passowrd
  if (!(password && email)) {
    res.status(401).json({ message: "Email and Password Must Required" });
  } else {
    // Check for register User or not
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json("User not exist with this Email!");
    }

    // Check For Password Validation
    const validPassword = await isValidPassword(
      password,
      findUser.password
    );

    if (!validPassword) {
      res.status(400).json("Password Incorrect!");
    }

    if (validPassword) {
      const token = await generateToken({
        objectId: findUser._id,
        email: findUser.email,
        role: findUser.role
      });

      res.status(200).json({
        userDetails: findUser,
        loginToken: token,
      });
    }
  }
};

// Find All User For admin use
exports.allUser = async (req, res) => {
  const allUserFind = await User.find({});
  res.status(200).json(allUserFind);
};
