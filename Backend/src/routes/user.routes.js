import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { getAllUserUrls } from "../controller/user.controller.js";

const router = express.Router()

router.post("/urls",authMiddleware, getAllUserUrls)
 
export default router 