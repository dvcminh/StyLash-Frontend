import React, { useEffect, useState } from 'react'
import FeatureCard from '../FeatureCard/featurecard'
import axios from 'axios'
import AuthService from '../../Auth/AuthService'

const Categories = () => {
  const [categories, setCategories] = useState([])
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
        const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get('http://localhost:8080/api/v1/management/getCategories', {
          headers: {
            Authorization: `Bearer ${accessToken}` // Sử dụng token JWT trong headers của yêu cầu
          }
        });
        const data = response.data;
        console.log(data);
        setCategories(data);
      } catch (error) {
      }
    };
    fetchCategories();
  }, [])

  if (categories.length === 0) return <div>Loading.....</div>

  return (
      <FeatureCard cards={categories}/>
  )
}

export default Categories