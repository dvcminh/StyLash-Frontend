import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/categories'
import ProductCard from '../../components/ProductCard/productcard'

import './products.css'

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <Categories/>
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs tracking-widest font-medium title-font mb-1 title">PRODUCTS</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white-900">ALL PRODUCTS</h1>
      </div>
      {
        products.length > 0 ?
        <ProductCard products={products}/>
        :
        <div>Loading.....</div>
      }
    </div>
  )
}

export default Products