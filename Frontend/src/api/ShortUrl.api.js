import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, customSlug) => {
  const payload = { url };

  if (customSlug) {
    payload.slug = customSlug; // ✅ Use "slug" to match backend
  }

  const { data } = await axiosInstance.post("/api/create", payload);
  console.log("data: ", data)
  return data;
};
