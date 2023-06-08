import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/productcard'

const CategoryProducts = () => {
  const { name } = useParams()
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://localhost:8080/api/products/category/${name}`)
      const data = await response.json()
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  if (products.length === 0) return <div>Loading.....</div>

  return (
    <ProductCard products={products} />
  )
}

export default CategoryProducts