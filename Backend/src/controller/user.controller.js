import { getAllUrls } from "../dao/user.dao.js"
import { wrapAsync } from "../utils/errorHandler.js"
import dotenv from 'dotenv';
dotenv.config();

let BASE_URL = process.env.APP_URL || "http://localhost:5000";


if (BASE_URL.endsWith("/")) {
  BASE_URL = BASE_URL.slice(0, -1);
}

export const getAllUserUrls = wrapAsync(async (req, res) => {
  const { _id } = req.user;

  const urls = await getAllUrls(_id); 

  // Add fullShortUrl field to each URL object
  // console.log("Bse_url----------", BASE_URL)
  const urlsWithFullShortUrl = urls.map(url => ({
    ...url.toObject ? url.toObject() : url, // if Mongoose doc, convert to plain obj
    fullShortUrl: `${BASE_URL}/${url.short_url}`, // dynamically construct full short URL
  }));

  res.status(200).json({ message: "Success", urls: urlsWithFullShortUrl });
});
