import React from "react";
import UrlForm from "../components/UrlForm";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition duration-300">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          URL Shortener
        </h1>
        <UrlForm/>
      </div>
    </div>
  );
}

export default HomePage;
