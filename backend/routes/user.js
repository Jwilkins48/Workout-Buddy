import express from "express";
import { loginUser, signupUser } from "../controller/userController.js";

const router = express.Router();

// login user - /api/user/login
router.post("/login", loginUser);

// Register user - /api/user/signup
router.post("/signup", signupUser);

export default router;
