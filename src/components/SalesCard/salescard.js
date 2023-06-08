import React from "react";
import { Link } from "react-router-dom";

import "./salescard.css";

export const SalesCard = ({ vouchers }) => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Copied to clipboard")
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="h-full flex items-center">
          {vouchers.map((voucher) => {
            return (
              <Link
                key={voucher.id}
                onClick={() => copyCode(voucher.code)} // Gọi hàm copyCode khi người dùng bấm vào voucher
              >
                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                  <span className="pb-2 mb-2 border-b-2 border-gray-200 white">
                    {voucher.expirationDate.substring(8, 10)}
                  </span>
                  <span className="font-medium text-lg title-font leading-none white">
                    {voucher.expirationDate.substring(5, 7)}
                  </span>
                </div>
                <div className="flex-grow pl-14">
                  <h2 className="tracking-widest text-xs title-font font-medium text-green-500 mb-1">
                    {voucher.discount}% OFF
                  </h2>
                  <h1 className="title-font text-xl font-medium text-white-900 mb-3">
                    {voucher.title}
                  </h1>
                  <p className="leading-relaxed mb-5">
                    {voucher.description}
                  </p>
                  <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium blue">
                        {voucher.code}
                      </span>
                    </span>
                  </a>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SalesCard;
