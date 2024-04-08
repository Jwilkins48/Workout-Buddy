import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  // Verify token
  const { authorization } = req.headers;

  // On error
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Remove 'bearer' from token
  const token = authorization.split(" ")[1];

  try {
    const _id = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not authorized" });
  }
};

export default requireAuth;
