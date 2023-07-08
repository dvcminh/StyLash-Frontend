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
import UpdateProductForm from "./UpdateProductForm";
import { NotificationContext } from "../Context/NotificationContext";
import { Link } from "react-router-dom";

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
  "Product",
  "Category",
  "Description",
  "Price",
  "Confirm"
];


export default function Report() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [searchCategory, setSearchCategory] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [id, setId] = useState(null);

  const handlePencilClick = (value) => {
    setIsModalOpen(true);
    setId(value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleDeleteSelect = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: 'Delete product successfully!',
        position: 'top-right'
      });
      setIsModalOpen(false);
    } catch (error) {
      setNotification({
        message: 'Delete product failed!',
        position: 'top-right'
      });
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleModalOverlayClick = () => {
    setIsModalOpen(false);
  };

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/api/v1/admin/getProductsBySearch', {
        params: {
          name: searchText,
          category: searchCategory
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
          
      const orders = response.data;
      setData(orders);
      console.log(orders);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchText, searchCategory]);

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
                <Link to={`/admin/update-product/${id}`}>
                  <Button>
                    Edit Product
                  </Button>
                </Link>              
                <Button onClick={() => handleDeleteSelect()}>
                  Delete Product
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
              Products list
            </Typography>
            <Typography color="gray" className="mt-1 ml-5 font-normal">
              See information about all products
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">        
          <div className="w-full md:w-64 mr-5 m-auto">
            <Input
              label="Search"
              placeholder="Search by category"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mt-2.5 ml-56" />}
              value={searchCategory}              
              onChange={handleSearchCategoryChange}
            />
          </div>
          <div className="w-full md:w-64 mr-5">
            <Input
              label="Search"
              placeholder="Search by name"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mt-2.5 ml-56" />}
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
                        <Avatar src={row.image} alt={"product's avatar"} />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {row.name}
                          </Typography>
                          {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {row.user.username}
                          </Typography> */}
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
                          {row.categoryDto.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                    <div className="flex flex-col" style={{width: "25rem"}}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          wrap="wrap"
                          break-normal
                        >
                          {row.description}
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
                          {row.price}
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
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
