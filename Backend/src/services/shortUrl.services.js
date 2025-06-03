import { generateNanoId } from "../utils/helper.js";
import { getCustomUrl  , saveShortUrl} from "../dao/shortUrlObjects.dao.js";

export const createShortUrlWithoutUser = async (url) => {
  try {
    const shortUrl =  generateNanoId(7);
    if(!shortUrl) throw new Error("Short URL not generated")

    await saveShortUrl(shortUrl, url)

    return shortUrl;
  } catch (error) {
    console.error("Error creating short URL:", error.message);
    throw error; // Let the controller catch it
  }
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  try {
    const shortUrl = slug || generateNanoId(7);

    // Check if custom slug already exists
    const exists = await getCustomUrl(shortUrl);
    if (exists) {
      throw new Error("The custom URL already exists");
    }

    // Save short URL mapping
    await saveShortUrl(shortUrl, url, userId);

    return shortUrl;
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.short_url) {
      throw new Error("The custom URL already exists");
    }
    console.error("Error creating short URL:", error.message);
    throw error;
  }
};
