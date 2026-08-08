// Login.jsx (with Forgot Password)
import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://benevolentchambers.onrender.com/api"; // Your backend API URL

export default function LoginModal({ onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // New state for forgot password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // New state for success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    try {
      let res;
      if (isRegister) {
        res = await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          password,
        });
        onLogin(res.data.user, res.data.token);
      } else if (isForgotPassword) {
        // New logic for sending a password reset link
        res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        setMessage(res.data.msg);
        setEmail(""); // Clear email field after sending
        setIsForgotPassword(false); // Return to login view
      } else {
        // Existing login logic
        res = await axios.post(`${API_URL}/auth/login`, { email, password });
        onLogin(res.data.user, res.data.token);
      }
      onClose(); // Close modal on successful action
    } catch (err) {
      console.error(
        "Authentication error:",
        err.response ? err.response.data : err.message
      );
      setError(
        err.response?.data?.msg || "Authentication failed. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="text-2xl font-bold mb-6 text-center">
          {isRegister
            ? "Register"
            : isForgotPassword
            ? "Forgot Password"
            : "Login"}
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegister}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!isForgotPassword && (
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              {isRegister
                ? "Register"
                : isForgotPassword
                ? "Send Reset Link"
                : "Login"}
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(!isForgotPassword);
                  setIsRegister(false); // Reset isRegister state
                }}
                className="inline-block align-baseline font-bold text-xs text-blue-600 hover:text-blue-800"
              >
                {isForgotPassword ? "Back to Login" : "Forgot password?"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setIsForgotPassword(false); // Reset forgot password state
                }}
                className="inline-block ml-4 align-baseline font-bold text-xs text-blue-600 hover:text-blue-800"
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
