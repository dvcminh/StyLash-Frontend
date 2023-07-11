import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { parseJwt } from '../../components/misc/Helpers';
import { NotificationContext } from "../Context/NotificationContext";

const API_URL = "http://localhost:8080/api/v1/auth";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const { setNotification } = useContext(NotificationContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    checkUserLoggedIn();
    checkRole();
  });

  const checkRole = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setRole(userData.role);
    }
  };

  const register = async (registerData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, registerData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const login = async (loginData) => {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, loginData);

      // Show login success toast
      setNotification({
        message: 'Sign in successfully!',
        position: 'top-right'
      });

      return response.data;
    } catch (error) {
      console.log( error.response.data);
    }
  };

  const logout = () => {
    // Remove tokens from local storage
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cart");

    setIsLoggedIn(false);

    // Show logout success toast
    setNotification({
        message: 'Logout successfully!',
        position: 'top-right'
      });
  };

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };

  const setRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
  };

  const isAccessTokenExpired = () => {
    const token = getAccessToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      return Date.now() >= decodedToken.exp * 1000;
    }
    return true;
  };

  const refreshAccessToken = async (refreshToken) => {
    console.log("refreshAccessToken" + refreshToken);
    try {
      const response = await axios.post(
        `${API_URL}/refresh-token`,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.log("loi refreshAccessToken");
    }
  };
  

  const checkUserLoggedIn = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      setIsLoggedIn(false);
      console.log("người dùng không có accesstoken")
      return;
    }

    try {
      const data = parseJwt(accessToken);
      const decodedToken = data;

      const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (đơn vị giây)

      if (decodedToken.exp < currentTime) {
        if (!refreshToken) {
          setNotification({
            message: 'Cannot find refresh token!',
            position: 'top-right'
          });
          setIsLoggedIn(false);
          console.log("người dùng không có refreshtoken")
          return;
        }

        try {
          const newAccessToken = await refreshAccessToken(refreshToken); // Làm mới access token

          // Lưu trữ access token mới
          setAccessToken(newAccessToken);

          // Giải mã access token mới
          const data1 = parseJwt(newAccessToken);
          const newDecodedToken = data1;

          // Kiểm tra thời hạn của access token mới
          if (newDecodedToken.exp < currentTime) {
            setNotification({
              message: 'New access token has expired!',
              position: 'top-right'
            });
            setIsLoggedIn(false); // Thời hạn của access token mới đã hết hiệu lực
            console.log("thời hạn của access token mới đã hết hiệu lực")
            return;
          }

          setIsLoggedIn(true); // Người dùng đã đăng nhập và có access token mới
          console.log("Người dùng đã đăng nhập và có access token mới")
        } catch (error) {
          setNotification({
            message: 'Your session has expired, please login again!',
            position: 'top-right'
          });
          logout();
          setIsLoggedIn(false); // Lỗi khi làm mới access token
          console.log("Lỗi khi làm mới access token")
          return;
        }
      } else {
        setIsLoggedIn(true); // Người dùng đã đăng nhập và access token còn hiệu lực
        console.log("Người dùng đã đăng nhập và access token còn hiệu lực")
      }
    } catch (error) {
      setIsLoggedIn(false); // Lỗi khi giải mã access token
    }
  };

  const authContextValue = {
    isLoggedIn,
    role,
    register,
    login,
    logout,
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    isAccessTokenExpired,
    refreshAccessToken,
    checkUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
