import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import { AuthContext } from "../../components/Context/AuthContext";
import AuthService from "../../Auth/AuthService";
import { NotificationContext } from "../../components/Context/NotificationContext";
import empty_cart from "../../assets/empty_cart.png";

import "./cart.css";

const Cart = () => {
  const authContext = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [voucherCode, setVoucherCode] = useState();
  const [voucher, setVoucher] = useState(0);
  const [shippingFee, setShippingFee] = useState(10);
  const carts = JSON.parse(localStorage.getItem("cart")) || [];
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
  }, [carts]);

  useEffect(() => {
    if (voucher !== undefined) {
      setTotalOrder((total + shippingFee) * ((100 - voucher) / 100));
    } else {
      setTotalOrder(total + shippingFee);
    }
  }, [total]);

  const handleInputChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const handleCheckVoucher = async () => {
    try {
      const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
      const formData = new FormData();
      formData.append("voucherCode", voucherCode);

      const voucherResponse = await axios.post(
        "http://localhost:8080/api/vouchers/check_voucher",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const voucherValue = voucherResponse.data;
      setVoucher(voucherValue);
      {voucherValue === 0 ? setNotification({
        isOpen: true,
        message: "Invalid voucher code!",
        type: "error",
      }) : setNotification({
        isOpen: true,
        message: "Voucher code applied!",
        type: "error",
      });}

    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Invalid voucher code!",
        type: "error",
      });
    }
  };

  const handleCheckout = async () => {
    try {
      const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
      const formData = new FormData();
      formData.append(
        "totalAmount",
        ((total + shippingFee) * ((100 - voucher) / 100)).toFixed(2)
      );
      formData.append("userId", userData.id);
      formData.append("shippingAddress", userData.address);
      formData.append("firstName", userData.firstname);
      formData.append("lastName", userData.lastname);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("email", userData.email);

      const orderResponse = await axios.post(
        "http://localhost:8080/api/orders/create_order",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const orderData = orderResponse.data;

      carts.map((item) => {
        console.log(item.size); // Kiểm tra giá trị của item.size
        // ...
      });

      const createItemPromises = carts.map(async (item) => {
        const itemFormData = new FormData();
        itemFormData.append("orderId", orderData);
        itemFormData.append("productId", item.id);
        itemFormData.append("quantity", item.quantity);
        itemFormData.append("pricePerUnit", item.price * item.quantity);
        itemFormData.append("size", item.size);
        itemFormData.append("color", item.color);
        itemFormData.append("voucher", voucher !== undefined ? voucher : 0);
        itemFormData.append(
          "shipping",
          shippingFee !== undefined ? shippingFee : 10
        );

        const response = await axios.post(
          "http://localhost:8080/api/order_items/createItem",
          itemFormData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      });

      await Promise.all(createItemPromises);

      setNotification({
        message: "Order created successfully",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      // Xử lý lỗi tại đây, ví dụ: hiển thị thông báo lỗi
    }

    localStorage.removeItem("cart");
  };

  const handleInc = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleDec = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        if (item.quantity < 2)
          return {
            ...item,
            quantity: 1,
          };
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const removeProduct = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  if (carts.length === 0) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl flex flex-col mt-20">
        <div>
          <h3 className="text-white">Cart is Empty</h3>
        </div>

        <div className="mt-10">
          <img src={empty_cart} alt="Animated GIF" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10">
          <div className="w-1/5 mb-5">
            <Link
              to={"/products"}
              className="flex font-semibold text-indigo-600 text-sm mt-10"
              style={{ color: "#00ADB5" }}
            >
              <svg
                className="fill-current mr-2 text-222831-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-black">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Color
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Size
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {carts?.map((cart) => {
            return (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <Link key={cart.id} to={`/api/products/${cart.id}`}>
                    <div className="w-20">
                      <img
                        className="h-24"
                        src={cart?.image_url}
                        alt={cart?.name}
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cart?.name}</span>
                    <span className="text-red-500 text-xs capitalize">
                      {cart?.category.name}
                    </span>
                    <div
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                      onClick={() => removeProduct(cart?.id)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={() => handleDec(cart?.id)}
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    value={cart?.quantity}
                  />

                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    onClick={() => handleInc(cart?.id)}
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${cart?.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {cart?.color}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {cart?.size}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${cart?.price * cart?.quantity}
                </span>
              </div>
            );
          })}
        </div>

        <div id="summary" className="w-1/4 px-8 py-10 overflow-x">
          <h1
            className="font-semibold text-2xl border-b pb-8"
            style={{ color: "#00ADB5" }}
          >
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span
              className="font-semibold text-sm uppercase"
              style={{ color: "#EEEEEE" }}
            >
              {carts?.length} Items
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: "#00ADB5" }}
            >
              {total?.toFixed(2)}$
            </span>
          </div>
          <div>
            <label
              className="font-medium inline-block mb-3 text-sm uppercase"
              style={{ color: "#EEEEEE" }}
            >
              Shipping
            </label>
            <select
              className="block p-2 w-full text-sm"
              style={{ color: "#393E46" }}
              onChange={(e) => {
                if (e.target.value === "standard") {
                  setShippingFee(10);
                } else if (e.target.value === "pickup") {
                  setShippingFee(0);
                }
              }}
            >
              <option value="standard">Standard shipping - $10.00</option>
              <option value="pickup">Self pick up - $0.00</option>
            </select>
          </div>
          <div className="py-10">
            <label
              for="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
              style={{ color: "#EEEEEE" }}
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              style={{ color: "#393E46" }}
              className="p-2 text-sm w-full"
              value={voucherCode} // Hiển thị giá trị hiện tại của voucherCode trong input
              onChange={handleInputChange} // Gọi hàm handleInputChange khi input thay đổi
            />
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
            onClick={handleCheckVoucher}
          >
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span style={{ color: "#EEEEEE" }}>Total cost</span>
              <span style={{ color: "#00ADB5" }}>
                ${((total + shippingFee) * ((100 - voucher) / 100)).toFixed(2)}
              </span>
            </div>
            <button
              className="font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full cart"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
