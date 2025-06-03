import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shortUrl.services.js";
import validUrl from "valid-url";
import { findUrlFromShortUrl } from "../dao/shortUrlObjects.dao.js";
import {wrapAsync} from "../utils/errorHandler.js"

export const createShortUrl = wrapAsync(async (req, res) => {
  try {
    const data = req.body;

    console.log(data.url);
    // Check if URL is provided
    if (!data.url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Validate URL format
    if (!validUrl.isWebUri(data.url)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Create short URL using the service  
    let short_url
    if(req.user)
      { 
        short_url = await createShortUrlWithUser(data.url, req.user._id, data.slug);
      }  
      else
      {
        short_url = await createShortUrlWithoutUser(data.url)
      }
    
    

    // Send back the result
    return res.status(200).json({short_url: process.env.APP_URL + short_url});
  } catch (error) {
    console.error("Error in createShortUrl controller:", error.message);
    if (error.message === "The custom URL already exists") {
      return res.status(409).json({ error: error.message }); // 409 Conflict
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// export const createShortUrlAuth = wrapAsync(async (req, res) => {
//   try {
//     const { url } = req.body;

//     console.log(url);
//     // Check if URL is provided
//     if (!url) {
//       return res.status(400).json({ error: "URL is required" });
//     }

//     // Validate URL format
//     if (!validUrl.isWebUri(url)) {
//       return res.status(400).json({ error: "Invalid URL format" });
//     }

//     // Create short URL using the service    
//     const short_url = await createShortUrlWithUser(url, req.user._id);
    

//     // Send back the result
//     return res.status(200).json({short_url: process.env.APP_URL + short_url});
//   } catch (error) {
//     console.error("Error in createShortUrl controller:", error.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });


export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await findUrlFromShortUrl(id);
  if (url) {
    console.log("RedirectionURL: ",url)
    res.redirect(url.full_url);
  } else {
    res.status(404).send("Url is not found or valid");
  }
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url, slug);
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
