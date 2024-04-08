import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create signup method
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Find if email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// Create login method
userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find if email exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid login");
  }

  // Hash password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid login");
  }

  return user;
};

export default mongoose.model("User", userSchema);
