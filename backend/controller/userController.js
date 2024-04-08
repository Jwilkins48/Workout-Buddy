import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Create JWT
const createToken = (_id) => {
  // id, secret, options
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // Create Token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    // Create Token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
