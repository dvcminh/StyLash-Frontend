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
import { Link } from "react-router-dom";
import { NotificationContext } from "../Context/NotificationContext";

const TABLE_HEAD = [
  "ID",
  "Code",
  "Discount",
  "Expiration",
  "Title",
  "Description",
  "Edit",
];

export default function Vouchers() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const { setNotification } = useContext(NotificationContext);
  const [searchName, setSearchName] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleSearchTextChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handlePencilClick = (value) => {
    setIsModalOpen(true);
    setId(value);
  };
  const handleDeleteSelect = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/deleteVoucher/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: "Delete voucher successfully!",
        position: "top-right",
      });
      fetchVouchers();
    } catch (error) {
      setNotification({
        message: "Delete voucher failed!",
        position: "top-right",
      });
    }
  };

  const fetchVouchers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/vouchers/getAll",
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
  const handleModalOverlayClick = () => {
    setIsModalOpen(false);
  };
  // Gọi hàm fetchVouchers khi searchText hoặc selectedTab thay đổi
  useEffect(() => {
    fetchVouchers();
  }, [searchName, selectedTab, isModalOpen]);

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
                <Link to={`/admin/updateVoucher/${id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => handleDeleteSelect()}>Delete</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="ml-5" variant="h5" color="blue-gray">
              Vouchers list
            </Typography>
            <Typography color="gray" className="mt-1 ml-5 font-normal">
              See information about all vouchers
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
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.code}
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
                        {row.discount}
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
                        {row.expirationDate.slice(0, 10)}
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
                        {row.title}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col" style={{ width: "23rem" }}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal break-normal"
                      >
                        {row.description}
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
