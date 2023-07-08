import React, { useEffect, useState, useContext } from 'react'
import FeatureCard from '../FeatureCard/featurecard'
import axios from 'axios'
import AuthService from '../../Auth/AuthService'
import { AuthContext } from '../Context/AuthContext'
import Loading from '../../modules/Loading/loading'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const authContext = useContext(AuthContext)
  useEffect(() => {
    // const a = async () => {
    //   const response = await fetch('https://fakestoreapi.com/products/categories')
    //   const data = await response.json()
    //   console.log(data, 'data')
    //   setCategories(data)
    // }
    // a()

    const fetchCategories = async () => {
      try {
        const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get('http://localhost:8080/categories', {
        });
        const data = response.data;
        console.log("lay tu /categories")
        console.log(data);
        setCategories(data);
      } catch (error) {
      }
    };
    fetchCategories();
  }, [])

  if (categories.length === 0) return <Loading size={50} />

  return (
      <FeatureCard cards={categories}/>
  )
}

export default Categories