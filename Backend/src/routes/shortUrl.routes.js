import express from "express";
import {createShortUrl } from "../controller/shortUrl.controller.js"

const router = express.Router();

router.post("/", createShortUrl );
// router.post("/", createShortUrlAuth );
export default router;
