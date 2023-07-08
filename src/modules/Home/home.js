import React, { useEffect, useState, useContext } from "react";
import Categories from "../../components/Categories/categories";
import FeatureCard from "../../components/FeatureCard/featurecard";
import Hero from "../../components/Hero/hero";
import ProductCard from "../../components/ProductCard/productcard";
import Stats from "../../components/StatCard";
import axios from "axios";
import AuthService from "../../Auth/AuthService";
import { AuthContext } from "../../components/Context/AuthContext";
import Loading from "../Loading/loading";
import { Navigate, useNavigate } from "react-router-dom";
import TopProductCard from "../../components/TopProductCard/topproductcard";

const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
    try {
      // const response1 = await axios.get(
      //   "http://localhost:8080/api/v1/management/me",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );
      // const data1 = response1.data;
      // localStorage.setItem("userData", JSON.stringify(data1));
      // console.log("lay tu /management/me");
      // console.log(data1);
      const response2 = await axios.get(
        "http://localhost:8080/api/products/top-liked-products"
      );
      const data2 = response2.data;
      setProducts(data2);
    } catch (error) {
      console.log(error);
      // try {
      //   const refreshToken = AuthService.getRefreshToken(); // Lấy refresh token từ localStorage
      //   // Gọi API để lấy access token mới
      //   const response = await axios.post(
      //     "http://localhost:8080/api/v1/auth/refresh-token",
      //     null,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${refreshToken}`,
      //       },
      //     }
      //   );
      //   const data = response.data;
      //   localStorage.setItem("accessToken", data.access_token);
      //   localStorage.setItem("refreshToken", data.refresh_token);
      //   console.log("lay tu /auth/refresh-token" + {data});
      // } catch (error) {
      //   alert(
      //     "Phiên đăng nhập của bạn đã hết hạn, xin vui lòng đăng nhập lại!"
      //   );
      //   navigate("/login");
      // }
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <>
      <Hero />
      <Categories />
      <div className="flex flex-col text-center w-full mt-20">
        <h2
          style={{ color: "#00ADB5" }}
          className="text-xs title tracking-widest font-medium title-font mb-1"
        >
          PRODUCTS
        </h2>
        <h1
          style={{ color: "#eee" }}
          className="sm:text-3xl text-2xl font-medium title-font sub-title"
        >
          MOST POPULAR PRODUCTS IN THIS WEEK
        </h1>
      </div>
      {products.length > 0 ? (
        <TopProductCard products={products} />
      ) : (
        <Loading size={50} />
      )}
      <Stats />
    </>
  );
};

export default Home;
