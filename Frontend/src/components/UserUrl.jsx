import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClipboardCopy, CheckCircle } from "lucide-react";
import { getAllUserUrls } from "../api/User.api";

const UserUrl = () => {
  const [copiedId, setCopiedId] = useState(null);

  const {
    data: urls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="ml-3 text-blue-600 font-medium">Loading URLs...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-6">Failed to load your URLs.</p>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <p>No URLs found.</p>
        <p>You haven't created any URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Shortened URLs
      </h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <div className="h-[400px] overflow-y-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 border-b">Original URL</th>
                <th className="px-4 py-3 border-b">Short URL</th>
                <th className="px-4 py-3 border-b">Clicks</th>
                <th className="px-4 py-3 border-b">Copy</th>
              </tr>
            </thead>
            <tbody>
              {urls.urls.reverse().map((urlData) => {
                // Use backend-provided fullShortUrl or fallback to frontend origin + slug
                const fullShortUrl =
                  urlData.fullShortUrl ||
                  `${window.location.origin}/${urlData.short_url}`;

                return (
                  <tr
                    key={urlData._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 border-b break-all text-sm text-blue-700">
                      <a
                        href={urlData.full_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {urlData.full_url}
                      </a>
                    </td>
                    <td className="px-4 py-3 border-b break-all text-sm text-blue-800">
                      <a
                        href={fullShortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {fullShortUrl}
                      </a>
                    </td>
                    <td className="px-4 py-3 border-b text-center text-sm">
                      <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {urlData.clicks || 0} clicks
                      </div>
                    </td>

                    <td className="px-4 py-3 border-b text-sm">
                      <button
                        onClick={() => handleCopy(fullShortUrl, urlData._id)}
                        className="text-green-600 hover:text-green-800 flex items-center"
                        aria-label="Copy full short URL"
                      >
                        {copiedId === urlData._id ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-1" /> Copied
                          </>
                        ) : (
                          <>
                            <ClipboardCopy className="w-5 h-5 mr-1" /> Copy
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserUrl;
