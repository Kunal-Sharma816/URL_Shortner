import { useState } from "react";
import { loginUser , logoutUser} from "../api/User.api.js";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../store/slice/authSlice.js"
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("John@hotmail.com");
  const [password, setPassword] = useState("john123");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const auth = useSelector((state)=>state.auth)
  console.log("auth", auth)

  const handleSubmit = async () => {
    setloading(true);
    setError("");
    try {
      const data = await loginUser(password, email);
    //   console.log("data: ", data)
      dispatch(login(data.user))
      navigate({to:"/dashboard"})
      setloading(false);
      console.log("signin success");
    } catch (error) {
      setloading(false);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <div>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => state(false)}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
