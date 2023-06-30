import React, { useState, useContext } from "react";
import AuthService from "../../Auth/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { Bird } from "phosphor-react";
import axios from "axios";
import { AuthContext } from "../../components/Context/AuthContext";

import "./LoginForm.css";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailPasswordError, setEmailPasswordError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset previous errors
    setEmailError("");
    setPasswordError("");
    setEmailPasswordError("");
  
    // Validate input
    let hasError = false;
  
    if (!email) {
      setEmailError("Please enter your email.");
      hasError = true;
    } else {
      // Regex pattern for email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setEmailError("Please enter a valid email address.");
        hasError = true;
      } else {
        setEmailError("");
      }
    }
  
    if (!password) {
      setPasswordError("Please enter your password.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
  
    try {
      const loginData = { email, password };
      const response = await authContext.login(loginData);
      authContext.setAccessToken(response.access_token);
      authContext.setRefreshToken(response.refresh_token);

      const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/management/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data;
        localStorage.setItem("userData", JSON.stringify(data));

        if (data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        
      } catch (error) {
        console.log(error);   
      }
    } catch (error) {
      setEmailPasswordError("Wrong password or email");
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden background">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 lg:max-w-xl border">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy title">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="form-message">{emailError}</div>}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="form-message">{passwordError}</div>}
          </div>
          <a href="#" className="text-xs hover:underline forgot-password">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md login-button">
              Login
            </button>
            {emailPasswordError && <div className="form-message">{emailPasswordError}</div>}
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
