import React, { useState, useEffect, useContext } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { NotificationContext } from "../Context/NotificationContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const TABLE_HEAD = [
  "ID",
  "Product",
  "Quantity",
  "Price",
  "Voucher Value",
  "Shipping Value",
  "Size",
    "Color",
];

const TABLE_ROWS = [
  // ...
];

export default function OrdersDetail() {
  const { id } = useParams();
  const { setNotification } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8080/api/v1/management/getOrderDetail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const orders = response.data;
      setData(orders);
      console.log("orders:")
      console.log(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Card className="h-full w-full">

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="ml-5" variant="h5" color="blue-gray">
              Orders detail list
            </Typography>
            <Typography color="gray" className="mt-1 ml-5 font-normal">
              See information about all orders' items
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {/* {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )} */}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ overflowX: "hidden" }}>
            {data.map((row, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={row.id} 
                        className="hover:bg-black hover:bg-opacity-5"
                >
                  <td className={classes}>
                    <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          #{row.id}
                        </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={row.product.avatar} alt={"user's avatar"} />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.product.name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {row.quantity}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {row.pricePerUnit}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div
                      className={`w-max ${
                        row.shippingStatus === "Shipping"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={row.voucherValue}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div
                      className={`w-max ${
                        row.paymentStatus === "Paid"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={row.shippingValue}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {row.size}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {row.color}
                      </Typography>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
