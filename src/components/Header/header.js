import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle, Bird } from "phosphor-react";
import axios from "axios";

import "./header.css";

const navigations = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Sales",
    path: "/sales",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  // const refreshAccessToken = async (refreshToken) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/v1/auth/refresh-token",
  //       null,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${refreshToken}`,
  //         },
  //       }
  //     );
  //     const accessToken  = response.data;
  //     return accessToken;
  //   } catch (error) {
  //     throw new Error("Failed to refresh access token");
  //   }};

  // Kiểm tra xem user đã login chưa
  // const isUserLoggedIn = async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const refreshToken = localStorage.getItem("refreshToken");

  //   if (!accessToken) {
  //     return false;
  //   }

  //   try {
  //     const decodedToken = jwt.verify(
  //       accessToken,
  //       "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"
  //     ); // Giải mã access token

  //     const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (đơn vị giây)

  //     if (decodedToken.exp < currentTime) {
  //       if (!refreshToken) {
  //         return false; // Không có refresh token, người dùng cần đăng nhập lại
  //       }

  //       try {
  //         const newAccessToken = await refreshAccessToken(refreshToken); // Làm mới access token

  //         // Lưu trữ access token mới
  //         localStorage.setItem("accessToken", newAccessToken);

  //         // Giải mã access token mới
  //         const newDecodedToken = jwt.verify(newAccessToken, "your_secret_key");

  //         // Kiểm tra thời hạn của access token mới
  //         if (newDecodedToken.exp < currentTime) {
  //           return false; // Thời hạn của access token mới đã hết hiệu lực
  //         }

  //         return true; // Người dùng đã đăng nhập và có access token mới
  //       } catch (error) {
  //         return false; // Lỗi khi làm mới access token
  //       }
  //     }

  //     return true; // Người dùng đã đăng nhập và access token còn hiệu lực
  //   } catch (error) {
  //     return false; // Lỗi khi giải mã access token
  //   }
  // };

  useEffect(() => {
    const navbar = document.querySelector("header");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Bird size={24} className="ml-5" style={{ color: "#00ADB5" }} />
          <span style={{ color: "#00ADB5" }} className="ml-3 text-xl header">
            StyLash
          </span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {navigations.map((navigation) => {
            return (
              <Link
                key={navigation.path}
                to={navigation.path}
                className="mr-5 pr-3 hover-text-color"
              >
                {navigation.name}
              </Link>
            );
          })}
        </nav>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center text-white border-0 py-2 px-4 focus:outline-none rounded text-base mt-4 md:mt-0"
          >
            <img src={userData.avatar} size={24} className="avatar" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Orders
              </Link>
              <Link
                to="/invoices"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Invoices
              </Link>

              <div className="border-t border-gray-300"></div>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Log out
              </Link>
            </div>
          )}
        </div>
        <Link
          to={"/cart"}
          className="inline-flex items-center text-white border-0 py-2 px-4 focus:outline-none rounded text-base mt-4 md:mt-0"
        >
          <ShoppingCart size={24} />
        </Link>
      </div>
      {/* Responsive Navbar */}
      <nav className="md:hidden bg-gray-100">
        <div className="flex items-center justify-between h-12 px-4">
          <button
            className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-grow"></div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/cart"}
              className="text-gray-600 hover:text-gray-700 focus:outline-none"
            >
              <ShoppingCart size={24} />
            </Link>
            <button
              onClick={toggleDropdown}
              className="text-gray-600 hover:text-gray-700 focus:outline-none"
            >
              <UserCircle size={24} className="avatar" />
            </button>
          </div>
        </div>
        {showDropdown && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/orders"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Đơn hàng
            </Link>
            <Link
              to="/invoices"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Hóa đơn
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Thông tin
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
