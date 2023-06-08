import React, { useState } from "react";
import AuthService from "../../Auth/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { Bird } from "phosphor-react";

import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const response = await AuthService.login(loginData);
      AuthService.setAccessToken(response.access_token);
      AuthService.setRefreshToken(response.refresh_token);
      console.log("ok");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button type="submit">Login</button>
    //   {error && <p>{error}</p>}
    // </form>
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
          </div>
          <a href="#" className="text-xs hover:underline forgot-password">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md login-button">
              Login
            </button>
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
