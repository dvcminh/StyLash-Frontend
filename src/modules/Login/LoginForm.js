import React, { useState, useContext } from "react";
import AuthService from "../../Auth/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { Bird } from "phosphor-react";
import axios from "axios";
import { AuthContext } from "../../components/Context/AuthContext";
import { NotificationContext } from "../../components/Context/NotificationContext";

import "./LoginForm.css";
import { CloseButton } from "@chakra-ui/react";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailPasswordError, setEmailPasswordError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");

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
          navigate("/admin/dashboard");
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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const itemFormData = new FormData();
      itemFormData.append("email", forgotPasswordEmail);
    console.log("forgot password submit")
    console.log("email " + forgotPasswordEmail)
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/reset-password",
        itemFormData
      );      

      console.log("forgot password submit response")
      console.log(response);
      setShowForgotPasswordModal(false);
      setNotification({
        type: "success",
        message: "Please check your email to reset password.",
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      setNotification({
        type: "error",
        message: "Something went wrong. Please try again.",
        position: "top-right",
      });
      setForgotPasswordError(error.response.data.message);
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
            {passwordError && (
              <div className="form-message">{passwordError}</div>
            )}
          </div>
          <div
            className="text-xs hover:underline forgot-password"
            onClick={handleForgotPassword}
          >
            Forget Password?
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md login-button">
              Login
            </button>
            {emailPasswordError && (
              <div className="form-message">{emailPasswordError}</div>
            )}
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
        {showForgotPasswordModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            <div className="relative bg-white p-8 m-4 md:max-w-md md:p-0 rounded shadow-lg">
              <div className="text-lg font-semibold mt-2 ml-3 mb-5">
                Forgot Password
              </div>
              <form
                onSubmit={handleForgotPasswordSubmit}
                className=""
                style={{ width: "20rem" }}
              >
                <div className="mb-2">
                  <label
                    htmlFor="forgot-email"
                    className="block text-sm font-semibold text-gray-800 email ml-3"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    value={forgotPasswordEmail}
                    style={{ width: "18.5rem" }}
                    className="m-auto block px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  />
                  {forgotPasswordError && (
                    <div className="form-message">{forgotPasswordError}</div>
                  )}
                </div>
                <button
                  type="submit"
                  style={{ width: "18.5rem" }}
                  className="mb-3 mt-9 flex justify-center items-center m-auto w-full px-4 py-2 mt-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md"
                >
                  Submit
                </button>
              </form>
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                <CloseButton size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
