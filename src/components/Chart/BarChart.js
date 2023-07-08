import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

function BarChart() {
  const authContext = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   ChartJS.register(
  //     {
  //       id: "custom_canvas_background_color",
  //       beforeDraw: (chart) => {
  //         const ctx = chart.canvas.getContext("2d");
  //         ctx.save();
  //         ctx.globalCompositeOperation = "destination-over";
  //         ctx.fillStyle = "white";
  //         ctx.fillRect(0, 0, chart.width, chart.height);
  //         ctx.restore();
  //       },
  //     },
  //     [],
  //   );
  // }, []);

  useEffect(() => {
    ChartJS.defaults.font.size = 16;
    ChartJS.defaults.font.family = "Roboto";
    ChartJS.defaults.font.weight = "bold";
    ChartJS.defaults.font.color = "#000000";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/daily-revenue", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            }            
        );
        const data = response.data;
        setData(data);        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Daily Revenue",
        data: data.map((item) => item.revenue),
        backgroundColor: "#F59E0B",
        borderColor: "#F59E0B",
        borderWidth: 1,
      },
    ],
  };
  
  return <Bar className="w-100 h-100" data={chartData} />;
}

export default BarChart;
