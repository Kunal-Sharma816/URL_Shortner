import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // ✅ simplest and most common
import coonnectDB from "./src/config/mongo.config.js";
import shortUrl from "./src/routes/shortUrl.routes.js";
import {redirectFromShortUrl} from "./src/controller/shortUrl.controller.js"
import cors from "cors"
import authRoutes from "./src/routes/auth.routes.js"
import { attachUsers } from "./src/utils/attachUsers.js";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js"


const app = express();

app.use(cors({
  origin: ['https://url-shortner-hcijtrcim-kunal-sharma816s-projects.vercel.app', 'http://localhost:5174'],
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUsers)
app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrl);
app.use("/api/user", userRoutes)

app.get("/:id", redirectFromShortUrl);

const  port = process.env.PORT || 5000;


app.listen(port, () => {
  coonnectDB();
  console.log("Sever is running on http://localhost:5000");
});

// GET - Redirect
// POST - Create short url
