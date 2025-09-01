import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../api/ShortUrl.api";
import { useSelector } from "react-redux";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);     // backend actual link
  const [demoUrl, setDemoUrl] = useState(null);       // demo/expected link
  const [copied, setCopied] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    setError(null);

    try {
      const data = await createShortUrl(url, customSlug);
      console.log("API Response:", data);

      // set actual backend shortened link
      setShortUrl(data.short_url_);

      // set demo/pretty link (replace base with "Linkly")
      setDemoUrl(replaceBackendLink(data.short_url_));

      setCopied(false);
      setUrl("");
      setCustomSlug("");
      queryClient.invalidateQueries(["userUrls"]);
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to shorten the URL. Try again.");
      }
      console.error("Error creating short URL:", err);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;

    navigator.clipboard
      .writeText(shortUrl)
      .then(() => setCopied(true))
      .catch((err) => {
        console.error("Failed to copy:", err);
        setCopied(false);
      });
  };

  // regex replace to show pretty link
  function replaceBackendLink(codeString) {
    const replaceWith = "Linkly";
    return codeString.replace(/localhost:5000/,"Linkly");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create a Short URL
        </h2>

        {/* ❗️ Show error message */}
        {error && (
          <div className="text-red-600 text-sm font-medium text-center bg-red-100 p-2 rounded-lg">
            {error}
          </div>
        )}

        {/* URL input */}
        <div>
          <label
            htmlFor="url-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Long URL
          </label>
          <input
            id="url-input"
            type="url"
            placeholder="https://google.com"
            value={url}
            onInput={(e) => setUrl(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Custom slug for authenticated users */}
        {isAuthenticated && (
          <div>
            <label
              htmlFor="customSlug"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Custom Slug{" "}
              <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="e.g. my-link"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">.yourdomain.com</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              You can define a custom slug like <strong>my-link</strong>{" "}
              (e.g., yourdomain.com/my-link).
            </p>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition"
        >
          Shorten URL
        </button>

        {/* Short URL display */}
        {shortUrl && (
          <div className="mt-4 bg-gray-100 p-4 rounded-xl space-y-3">
            <p className="text-gray-700 font-semibold text-center">
              Your Shortened Link
            </p>

            {/* Pretty/demo link */}
            <div className="bg-white p-3 rounded-lg shadow flex flex-col items-center">
              <span className="text-gray-500 text-xs">Demo Link</span>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all block text-sm font-medium"
              >
                {demoUrl}
              </a>
            </div>

            {/* Actual backend link */}
            <div className="bg-white p-3 rounded-lg shadow flex flex-col items-center">
              <span className="text-gray-500 text-xs">Actual Link</span>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 break-all block text-xs"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-xl text-sm transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
