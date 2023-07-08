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
import { Link, useNavigate } from "react-router-dom";

const TABS = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Shipping",
    value: "shippingStatus",
  },
  {
    label: "Payment",
    value: "paymentStatus",
  },
];

const TABLE_HEAD = [
  "ID",
  "Customer",
  "Date",
  "Shipping status",
  "Payment status",
  "Total",
  "Edit",
];

const TABLE_ROWS = [
  // ...
];

export default function AdminOrders() {
  const { setNotification } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [id, setId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const navigate = useNavigate();

  const handlePencilClick = (value) => {
    setIsModalOpen(true);
    setId(value);
  };

  const handlePaymentSelect = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("orderId", id);
    formData.append("paymentStatus", "Paid");
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/${id}/payment-status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: "Update payment status successfully!",
        position: "top-right",
      });
      setIsModalOpen(false);
    } catch (error) {
      setNotification({
        message: "Update payment status failed!",
        position: "top-right",
      });
    }
  };

  const handleShippingSelect = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("orderId", id);
    formData.append("shippingStatus", "Shipping");
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/${id}/shipping-status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: "Update shipping status successfully!",
        position: "top-right",
      });
      setIsModalOpen(false);
    } catch (error) {
      setNotification({
        message: "Update shipping status failed!",
        position: "top-right",
      });
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleModalOverlayClick = () => {
    setIsModalOpen(false);
  };

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/getOrdersBySearch",
        {
          params: {
            text: searchText,
            shippingStatus: selectedTab === "shippingStatus" ? "Pending" : null,
            paymentStatus: selectedTab === "paymentStatus" ? "Pending" : null,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const orders = response.data;
      setData(orders);
      console.log(orders);
      // Xử lý dữ liệu orders ở đây
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchText, selectedTab, isModalOpen]);

  return (
    <Card className="h-full w-full">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-500 opacity-50"
            onClick={handleModalOverlayClick}
          ></div>
          <Card className="z-10">
            <CardHeader>
              <Typography variant="h5">Choose an option</Typography>
            </CardHeader>
            <CardBody>
              <div className="flex gap-4">
                <Button onClick={() => handleShippingSelect()}>
                  Confirm Shipping Status
                </Button>
                <Button onClick={() => handlePaymentSelect()}>
                  Confirm Payment Status
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="ml-5" variant="h5" color="blue-gray">
              Orders list
            </Typography>
            <Typography color="gray" className="mt-1 ml-5 font-normal">
              See information about all orders
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => handleTabChange(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72 mr-5">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mt-2.5 ml-1" />}
              value={searchText}
              onChange={handleSearchTextChange}
            />
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
                <tr
                  key={row.id}
                  className="hover:bg-black hover:bg-opacity-5"
                >
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Link
                        to={`/admin/orders/${row.id}`}
                        className="hover:underline"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          #{row.id}
                        </Typography>
                      </Link>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={row.user.avatar} alt={"user's avatar"} />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.user.firstName} {row.user.lastName}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {row.user.username}
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
                        {row.createdAt.slice(0, 10)}
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
                        value={row.shippingStatus}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <div className={`w-max ${
                        row.paymentStatus === "Paid"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={row.paymentStatus}
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
                        {row.totalAmount}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handlePencilClick(row.id)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
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
