import React, { useEffect } from "react";

const OrderDetail = ({ items }) => {
  const voucherValue = items.length > 0 ? items[0].voucherValue : 0;
  const shippingValue = items.length > 0 ? items[0].shippingValue : 0;
  const subtotal = items.reduce((total, item) => total + item.pricePerUnit, 0);
  const total = (subtotal + shippingValue) * (1 - voucherValue / 100);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="list-none m-0 p-0">
          <div className="flex justify-between m-4 border-bottom">
            <div className="flex items-center">
              <img
                className="w-24 h-24 object-cover mr-5"
                src={item.product.avatar}
                alt={item.product.name}
              />
              <div>
                <h3 className="mt-0 mx-0 text-xl">{item.product.name}</h3>
                <div className="italic">Quantity: {item.quantity}</div>
                <div className="mt-3 font-bold text-2xl text-yellow-550">
                  ${item.pricePerUnit}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
        </div>
      ))}

      {/* Display voucherValue and shippingValue */}
      <div className="flex justify-end">
        <div className="mr-6">
          <p>Voucher Value: {voucherValue}%</p>
          <p>Shipping Value: ${shippingValue}</p>
          <p>Subtotal: ${total.toFixed(2)}</p>  
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
