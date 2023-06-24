import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString();
  const formattedTime = orderDate.toLocaleTimeString();

  return (
    <div className="list-none m-0 p-0">
      <div className="flex justify-between m-4 pb-4 border-bottom">
        <div>
          <h3 className="mt-0 mx-0 mb-1">Order #{order.id}</h3>
          <div className="italic">
            Date: {formattedDate}, Time: {formattedTime}
          </div>
          <div className="mt-1 font-bold text-xl text-yellow-550">
            ${order.totalAmount}
          </div>
        </div>
        <div className="text-right">
          <Link to={`/api/v1/management/getOrderDetail/${order.id}`}>
            <button className="button">Details</button>
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
    </div>
  );
};

export default OrderItem;
