import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AuthService from "../../Auth/AuthService";
import "./orders.css";
import Loading from "../Loading/loading";
import OrderItem from "../../components/OrderItemCard/OrderItem";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = AuthService.getAccessToken();
      const params = new URLSearchParams();
      params.append("userId", userData.id);
      params.append("shippingAddress", userData.address);
      params.append("firstName", userData.firstname);
      params.append("lastName", userData.lastname);
      params.append("email", userData.email);
      params.append("phoneNumber", userData.phoneNumber);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/management/getOrders",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <Loading />;
  }

  return (
    <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
      <h1 className="font-bold text-center mb-8 title">Your Orders</h1>

      <div className="p-4 bg-white shadow-md rounded-2xl">
        {orders.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </div>
    </section>
  );
};

export default Orders;
