import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "./helper.js"


export const attachUsers = async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token)
  if (!token) return next(); // No token, continue

  try {
    const decoded = verifyToken(token); // Make sure token is a string
    console.log(decoded , "Hello")
    if (!decoded) return next();

    const user = await findUserById(decoded.id);
    console.log(user)
    if (!user) return next();


    req.user = user;
    next();
  } catch (error) {
    console.error("attachUsers error:", error.message);
    next();
  }
};
