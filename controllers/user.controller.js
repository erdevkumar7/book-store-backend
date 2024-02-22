const {
  hashPassword,
  isValidPassword,
  generateToken,
} = require("../helper/auth");
const db = require("../models/index.model");
const User = db.User;

exports.allUser = async (req, res) => {
  res.status(200).json("allUserFind");
};

// User signUp
exports.registration = async (req, res) => {
  const { user_email, user_password } = req.body;
  // Check for email and passowrd
  if (!(user_password && user_email)) {
    res.status(401).json({ message: "Email and Password Must Required" });
  } else {
    // check for existing user
    const findUser = await User.findOne({ user_email: user_email });
    if (findUser) {
      res.status(400).json("Email already Registered!");
    }

    // Register new user
    if (!findUser) {
      const userCreated = await User.create({
        ...req.body,
        user_password: await hashPassword(user_password), //hashing password
      });
      res.status(201).json(userCreated);
    }
  }
};

// Login the user
exports.loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  // Check for email and passowrd
  if (!(user_password && user_email)) {
    res.status(401).json({ message: "Email and Password Must Required" });
  } else {
    // Check for register User or not
    const findUser = await User.findOne({ user_email: user_email });
    if (!findUser) {
      return res.status(404).json("User not exist with this Email!");
    }

    // Check For Password Validation
    const validPassword = await isValidPassword(
      user_password,
      findUser.user_password
    );

    if (!validPassword) {
      res.status(400).json("Password Incorrect!");
    }

    if (validPassword) {
      const token = await generateToken({
        user_objectId: findUser._id,
        user_email: findUser.user_email,
      });

      res.status(200).json({
        userDetails: findUser,
        loginToken: token,
      });
    }
  }
};

exports.userUpdate = async (req, res) => {
  //   const { id } = req.params;
  //   const updatedUser = await User.update(req.body, { where: { id: id } });
  //   if (updatedUser) {
  //     const findUpdatedUser = await User.findOne({ where: { id: id } });
  res.status(201).json("findUpdatedUser");
  //   } else {
  //     console.log("User not Updated ... ");
  //   }
};


