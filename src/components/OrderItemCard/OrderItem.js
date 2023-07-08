import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString();
  const formattedTime = orderDate.toLocaleTimeString();

  

  const handleConfirmDelivery = () => {
    // Thực hiện xử lý khi người dùng xác nhận đã nhận hàng
    // Ví dụ: Gửi yêu cầu đến server để cập nhật trạng thái đã nhận hàng

  };

  let shippingStatusColor = '';
  if (order.shippingStatus === 'Shipping') {
    shippingStatusColor = 'text-green-500';
  } else {
    shippingStatusColor = 'text-red-500';
  }

  let paymentStatusColor = '';
  if (order.paymentStatus === 'Paid') {
    paymentStatusColor = 'text-green-500';
  } else {
    paymentStatusColor = 'text-red-500';
  }

  

  return (
    <div className="list-none m-0 p-0">
      <div className="flex justify-between m-4 pb-4 border-bottom">
        <div>
          <h3 className="mt-0 mx-0 mb-1 font-bold">Order #{order.id}</h3>
          <div className="italic">
            Date: {formattedDate}, Time: {formattedTime}
          </div>
          <div className={`mt-1 font-semibold ${shippingStatusColor}`}>
            Shipping Status: {order.shippingStatus}
          </div>
          <div className={`mt-1 font-semibold ${paymentStatusColor}`}>
            Payment Status: {order.paymentStatus}
          </div>
          <div className="mt-1 font-semibold text-xl text-yellow-550">
            ${order.totalAmount}
          </div>
        </div>
        <div className="flex flex-col">
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
