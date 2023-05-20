import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/categories'
import FeatureCard from '../../components/FeatureCard/featurecard'
import Hero from '../../components/Hero/hero'
import ProductCard from '../../components/ProductCard/productcard'
import Products from '../../components/ProductCard/productcard'
import Stats from '../../components/StatCard'

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products?limit=12')
      const data = await response.json()
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])

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