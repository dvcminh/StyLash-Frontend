import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import Loading from '../Loading/loading';
import SalesCard from '../../components/SalesCard/salescard';


export const Sales = () => {
    const [vouchers, setVouchers] = useState([])

    useEffect(() => {

      const fetchVouchers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/vouchers/getAll', {
          });
          const data = response.data;
          console.log("/vouchers")
          console.log(data)
          setVouchers(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchVouchers();
    }, [])
  
    return (
      <div>
        {/* <Categories/> */}
        <div className="flex flex-col text-center w-full mt-20">
          <h2 className="text-xs tracking-widest font-medium title-font mb-1 title">Sales</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white-900">ALL VOUCHERS</h1>
        </div>
        {
          vouchers.length > 0 ?
          <SalesCard vouchers={vouchers}/>
          :
          <Loading size={50} />
        }
      </div>
    )
  }
  
  export default Sales