import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import OrderDetail from "../../components/OrderDetailCard/OrderDetail";
import Loading from "../Loading/loading";
import AuthService from "../../Auth/AuthService";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../components/Context/AuthContext";
const OrderDetailPage = () => {
  const authContext = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const accessToken = authContext.getAccessToken();
        const response = await axios.get(
          `http://localhost:8080/api/v1/management/getOrderDetail/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            }            
        );
        const data = response.data;
        setOrder(data);
        console.log(`lay tu /management/getOrderDetail/${id}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <Loading />;
  }

  return (
    <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
      <h1 className="font-bold text-center mb-8 title">Order Details</h1>

      <div className="p-4 bg-white shadow-md rounded-2xl">
          <OrderDetail items = {order}/>
      </div>
    </section>
  );
};

export default OrderDetailPage;
