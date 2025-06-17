import React from "react";
import { Link } from "@tanstack/react-router";

const Navbar = ({ isLoggedIn, userName, onLogout }) => {
  return (
    <nav className="w-full bg-white fixed  px-6 py-4 border border-b-black">
      <div className=" mx-auto flex items-center justify-between">
        
        {/* Leftmost App Name */}
        <div className="w-1/3">
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
            Linkly
          </Link>
        </div>

        {/* Centered navigation links */}
        <div className="w-1/3 flex justify-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </div>

        {/* Right-aligned user or login */}
        <div className="w-1/3 flex justify-end items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 font-medium">Hello, {userName}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
