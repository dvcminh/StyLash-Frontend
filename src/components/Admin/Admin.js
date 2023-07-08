import React, { useEffect, useState, useContext } from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart, FiRefreshCcw, FiSettings } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import LineChart from "../Chart/LineChart";
import { StylashApi } from "../misc/StylashApi";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import BarChart from "../Chart/BarChart";

const Admin = () => {
  const [barChartData, setBarChartData] = useState();
  const [productNumber, setProductNumber] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [customerNumber, setCustomerNumber] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const accessToken = authContext.getAccessToken();
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/total-revenue",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTotalRevenue(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchNumberProduct = async () => {
      try {
        const accessToken = authContext.getAccessToken();
        const response = await axios.get(
          "http://localhost:8080/api/products/count"
        );
        setProductNumber(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchNumberCustomer = async () => {
      try {
        const accessToken = authContext.getAccessToken();
        const response = await axios.get(
          "http://localhost:8080/api/users/countUsers"
        );
        setCustomerNumber(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchNumberOrders = async () => {
      try {
        const accessToken = authContext.getAccessToken();
        const response = await axios.get(
          "http://localhost:8080/api/orders/countOrders"
        );
        setOrderNumber(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalRevenue();
    fetchNumberProduct();
    fetchNumberCustomer();
    fetchNumberOrders();
  }, []);

  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: `${customerNumber}`,
      percentage: "-4%",
      title: "Customers",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    {
      icon: <BsBoxSeam />,
      amount: `${productNumber}`,
      title: "Products",
      iconColor: "rgb(255, 244, 0)",
      iconBg: "rgb(254, 201, 15)",
    },
    {
      icon: <FiBarChart />,
      amount: `$${totalRevenue}`,
      title: "Profits",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",
    },
    {
      icon: <HiOutlineRefresh />,
      amount: `${orderNumber}`,
      title: 'Orders',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },

  ];
  return (
    <div className="">
      <div className=" flex-wrap lg:flex-nowrap justify-center">        
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-3xl text-bold opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span
                  className="text-lg font-semibold "
                  style={{ color: item.iconColor }}
                >
                  {item.amount}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-item p-12 ">
        <BarChart />
      </div>
    </div>
  );
};

export default Admin;
