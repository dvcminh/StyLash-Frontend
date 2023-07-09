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
import { Trash } from "phosphor-react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useParams } from "react-router-dom";

const TABLE_HEAD = ["ID", "Product"];

export default function Wishlist() {
    const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  const { setNotification } = useContext(NotificationContext);
  const [searchName, setSearchName] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const user = JSON.parse(localStorage.getItem("userData"));
  const id = user.id;

  const handleSearchTextChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const fetchCustomers = async () => {
    try {
      const accessToken = authContext.getAccessToken();
      
      const response = await axios.get(
        `http://localhost:8080/api/v1/management/getWishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const orders = response.data;
      setData(orders);
      console.log("data")
      console.log(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchName, selectedTab]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="ml-5" variant="h5" color="blue-gray">
              Wishlist of {user.firstname} {user.lastname}
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
                      <Avatar src={row.product.avatar} alt={"product's avatar"} />
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
