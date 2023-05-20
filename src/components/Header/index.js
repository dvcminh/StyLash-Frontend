import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle, Bird } from "phosphor-react";

import "./index.css";

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
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

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
            <UserCircle size={24} className="avatar" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <Link
                to="/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Đơn hàng
              </Link>
              <Link
                to="/invoices"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Hóa đơn
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Thông tin
              </Link>
              <div className="border-t border-gray-300"></div>
              <Link
                to="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Đăng xuất
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
    </header>
  );
};

export default Header;
