import React, {useState, useContext, useEffect} from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

function PieChart() {
  const authContext = useContext(AuthContext);
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
          "http://localhost:8080/categories/totals", {
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
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A2D8E8',
          '#Q2D8E8',          
          // Add more colors if needed
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A2D8E8',
          '#Q2D8E8',
          // Add more colors if needed
        ],
      },
    ],
  };
  return <Pie data={chartData} />;
}

export default PieChart;
