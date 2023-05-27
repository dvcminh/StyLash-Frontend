import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/categories'
import FeatureCard from '../../components/FeatureCard/featurecard'
import Hero from '../../components/Hero/hero'
import ProductCard from '../../components/ProductCard/productcard'
import Products from '../../components/ProductCard/productcard'
import Stats from '../../components/StatCard'
import axios from 'axios'
import AuthService from '../../Auth/AuthService'

const Home = () => {

  const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch('https://fakestoreapi.com/products?limit=12')
  //     const data = await response.json()
  //     console.log(data)
  //     setProducts(data)
  //   }
  //   fetchProducts()
  // }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("abc")

        const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get('http://localhost:8080/api/v1/management/getCategories', {
          headers: {
            Authorization: `Bearer ${accessToken}` // Sử dụng token JWT trong headers của yêu cầu
          }
        });
        const data = response.data;
        console.log(data);
        // setProducts(data);
      } catch (error) {
      }
    };
    fetchProducts();
  }, []);

  
  return (
    <>
      <Hero />
      <Categories/>
      <div className="flex flex-col text-center w-full mt-20">
        <h2 style={{color:"#00ADB5"}} className="text-xs tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
        <h1 style={{color:"#eee"}} className="sm:text-3xl text-2xl font-medium title-font">MOST POPULAR PRODUCTS</h1>
      </div>  
      {
        products.length > 0 ? 
        <ProductCard products={products} /> 
        :
        <div>Loading.....</div>
      }
      {/* <Products /> */}
      <Stats />
    </>
  )
}

export default Home
