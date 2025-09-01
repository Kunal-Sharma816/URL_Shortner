import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, customSlug) => {
  const payload = { url };

  if (customSlug) {
    payload.slug = customSlug; 
  }

  const { data } = await axiosInstance.post("/api/create", payload);
  console.log("data: ", data)
  return data;
};
