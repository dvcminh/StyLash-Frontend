import React, { useState, useEffect, useContext } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { BiTrash } from "react-icons/bi";
import { NotificationContext } from "../Context/NotificationContext";

const TABLE_HEAD = ["ID", "Customer", "Phone Number", "Address",];

export default function Customers() {
  const [data, setData] = useState([]);
  const { setNotification } = useContext(NotificationContext);
  const [searchName, setSearchName] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleSearchTextChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const fetchCustomers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/getUsersBySearch",
        {
          params: {
            name: searchName,
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

  // Gọi hàm fetchCustomers khi searchText hoặc selectedTab thay đổi
  useEffect(() => {
    fetchCustomers();
  }, [searchName, selectedTab]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="ml-5" variant="h5" color="blue-gray">
              Customers list
            </Typography>
            <Typography color="gray" className="mt-1 ml-5 font-normal">
              See information about all customers
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-64 ml-5">
            <Input
              label="Search"
              placeholder="Search by name"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mt-2.5 ml-56" />}
              value={searchName}
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
                <tr key={row.id}>
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
                      <Avatar src={row.avatar} alt={"user's avatar"} />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.firstname} {row.lastname}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {row.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  {/* <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.createdAt.slice(0, 10)}
                        </Typography>
                      </div>
                    </td> */}
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {row.phoneNumber}
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
                        {row.address}
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
