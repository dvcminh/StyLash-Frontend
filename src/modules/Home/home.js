import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories/categories";
import FeatureCard from "../../components/FeatureCard/featurecard";
import Hero from "../../components/Hero/hero";
import ProductCard from "../../components/ProductCard/productcard";
import Products from "../../components/ProductCard/productcard";
import Stats from "../../components/StatCard";
import axios from "axios";
import AuthService from "../../Auth/AuthService";
import Loading from "../Loading/loading";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để navigate đến các trang

  useEffect(() => {
    const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage
    // Gọi API và lưu dữ liệu vào Local Storage
    axios
      .get("http://localhost:8080/api/v1/management/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .catch(() => {
        const refreshToken = AuthService.getRefreshToken(); // Lấy refresh token từ localStorage
        // Gọi API để lấy access token mới
        axios
          .post("http://localhost:8080/api/v1/auth/refresh-token", null, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          })
          .then((response) => {
            const data = response.data;
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("refreshToken", data.refresh_token);
          })
          .catch(() => {
            alert(
              "Phiên đăng nhập của bạn đã hết hạn, xin vui lòng đăng nhập lại!"
            );
            navigate("/login");
          });
      });
  }, []);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const response = await fetch('https://fakestoreapi.com/products?limit=12')
    //   const data = await response.json()
    //   console.log(data)
    //   setProducts(data)
    // }
    // fetchProducts()

    const fetchProducts = async () => {
      try {
        const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get(
          "http://localhost:8080/api/products/top-liked-products"
        );
        const data = response.data;
        console.log("lay tu /products/top-liked-products");
        console.log(data);
        setProducts(data);
      } catch (error) {}
    };
    fetchProducts();

    // const fetchProducts = async () => {
    //   try {
    //     const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage
    //     const response = await axios.get('http://localhost:8080/api/v1/management/getCategories', {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}` // Sử dụng token JWT trong headers của yêu cầu
    //       }
    //     });
    //     const data = response.data;
    //     console.log(data);
    //     // setProducts(data);
    //   } catch (error) {
    //   }
    // };
    // fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      <Categories />
      <div className="flex flex-col text-center w-full mt-20">
        <h2
          style={{ color: "#00ADB5" }}
          className="text-xs tracking-widest font-medium title-font mb-1"
        >
          PRODUCTS
        </h2>
        <h1
          style={{ color: "#eee" }}
          className="sm:text-3xl text-2xl font-medium title-font"
        >
          MOST POPULAR PRODUCTS
        </h1>
      </div>
      {products.length > 0 ? (
        <ProductCard products={products} />
      ) : (
        <Loading size={50} />
      )}
      <Stats />
    </>
  );
};

export default Home;
