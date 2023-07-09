import React, { useState, useContext, useEffect } from "react";
import PieChart from "../Chart/PieChart";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Crown } from "phosphor-react";
import { color } from "@chakra-ui/react";

export const Management = () => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/top-3-highest-spenders",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const orders = response.data;
      console.log("data:  ", orders);
      setData(orders);
      console.log(orders);
      // Xử lý dữ liệu orders ở đây
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section class="text-gray-600 body-font flex flex-wrap">
      <div class="container px-5 py-24 mx-auto">
        <h1
          class="text-3xl font-medium title-font text-gray-900 text-center mb-5"
          style={{ color: "#00ADB5" }}
        >
          Top 3 highest spenders
        </h1>
        <div class="flex flex-wrap -m-4">
          {data.map((item, index) => (
            /* top 3 highest spenders */
            <div className="p-4 md:w-1/3">
              {index === 0 && <Crown size={60} weight="fill" color="#FFD700" />}

              {index === 1 && <Crown size={40} weight="fill" color="#C0C0C0" />}

              {index === 2 && <Crown size={24} weight="fill" color="#cd7f32" />}

              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={item.avatar}
                  alt="avatar"
                />
                <div class="p-6">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {index === 0 && "1st"}
                    {index === 1 && "2nd"}
                    {index === 2 && "3rd"}
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3" style={{color: "#00ADB5"}}>
                    {item.firstname} {item.lastname}
                  </h1>
                  <p class="leading-relaxed mb-3">
                    {item.email} <br />
                  </p>                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-3xl font-bold m-10" style={{color: "#00ADB5"}}>
          Distribution of categories
        </h1>
        <PieChart />
      </div>
    </section>
  );
};
