import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  PlusIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { AiFillLike, AiOutlineMenu } from "react-icons/ai";
import { Bird, Users } from "phosphor-react";
import {
  BiAnalyse,
  BiLike,
  BiSolidAnalyse,
  BiSolidCategory,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import { HiOutlineUser, HiTicket } from "react-icons/hi";
import { MdCategory, MdOutlineCategory, MdReport, MdReportGmailerrorred, MdReportProblem } from "react-icons/md";
import { RiListOrdered, RiListOrdered2, RiUser2Fill } from "react-icons/ri";
import { FaJediOrder } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { BsTicket } from "react-icons/bs";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navi = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = () => {
    authContext.logout();
    navi("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${isSidebarOpen ? "w-full z-50" : "w-16"}`}>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? (
          ""
        ) : (
          <button
            className="fixed text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2 hidden lg:block lg:ml-auto top-5 left-5 z-50 shadow-xl shadow-blue-gray-900/5"
            onClick={toggleSidebar}
          >
            <AiOutlineMenu />
          </button>
        )}
      </button>
      {isSidebarOpen && (
        <Card className="fixed h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ml-5 rounded-2xl">
          <div className="mb-2 flex items-center gap-4 p-4">
            <Bird size={32} />
            <Typography variant="h5" color="blue-gray">
              StyLash
            </Typography>
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2 hidden lg:block lg:ml-auto"
              onClick={toggleSidebar}
            >
              <AiOutlineMenu />
            </button>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Statistics
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/dashboard">
                    <ListItem>
                      <ListItemPrefix>
                        <BiSolidAnalyse strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Analytics
                    </ListItem>
                  </Link>
                  <Link to="/admin/reporting">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Reporting
                    </ListItem>
                  </Link>
                  <Link to="/admin/management">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Projects
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Products
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/Products">
                    <ListItem>
                      <ListItemPrefix>
                        <CubeTransparentIcon
                          strokeWidth={3}
                          className="h-3 w-5"
                        />
                      </ListItemPrefix>
                      Manage Products
                    </ListItem>
                  </Link>
                  <Link to="/admin/addProduct">
                    <ListItem>
                      <ListItemPrefix>
                        <PlusIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Products
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <RiListOrdered2 className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Orders
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/orders">
                    <ListItem>
                      <ListItemPrefix>
                        <FaJediOrder strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Manage Orders
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 4}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <RiUser2Fill className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Customers
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/customers">
                    <ListItem>
                      <ListItemPrefix>
                        <HiOutlineUser strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Manage Customers
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 5}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <BiSolidCategory className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Category
                  </Typography>
                </AccordionHeader>
              </ListItem>
              
              <AccordionBody className="py-1">
                <List className="p-0">

                  <Link to="/admin/category">
                    <ListItem>
                      <ListItemPrefix>
                        <MdOutlineCategory
                          strokeWidth={3}
                          className="h-3 w-5"
                        />
                      </ListItemPrefix>
                      Manage Category
                    </ListItem>
                  </Link>
                  <Link to="/admin/addCategory">
                    <ListItem>
                      <ListItemPrefix>
                        <PlusIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Category
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 7}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 7}>
                <AccordionHeader
                  onClick={() => handleOpen(7)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <HiTicket className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Voucher
                  </Typography>
                </AccordionHeader>
              </ListItem>

              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/voucher">
                    <ListItem>
                      <ListItemPrefix>
                        <MdOutlineCategory
                          strokeWidth={3}
                          className="h-3 w-5"
                        />
                      </ListItemPrefix>
                      Manage Voucher
                    </ListItem>
                  </Link>
                  <Link to="/admin/addVoucher">
                    <ListItem>
                      <ListItemPrefix>
                        <PlusIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Voucher
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 8}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 8}>
                <AccordionHeader
                  onClick={() => handleOpen(8)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <AiFillLike className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Likes
                  </Typography>
                </AccordionHeader>
              </ListItem>

              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/likes">
                    <ListItem>
                      <ListItemPrefix>
                        <BiLike
                          strokeWidth={3}
                          className="h-3 w-5"
                        />
                      </ListItemPrefix>
                      Manage Likes
                    </ListItem>
                  </Link>
                  {/* <Link to="/admin/addVoucher">
                    <ListItem>
                      <ListItemPrefix>
                        <PlusIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Voucher
                    </ListItem>
                  </Link> */}
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 9}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 9}>
                <AccordionHeader
                  onClick={() => handleOpen(9)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <MdReport className="h-5 w-5 mr-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Reports
                  </Typography>
                </AccordionHeader>
              </ListItem>

              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/reports">
                    <ListItem>
                      <ListItemPrefix>
                        <MdReportProblem
                          strokeWidth={3}
                          className="h-3 w-5"
                        />
                      </ListItemPrefix>
                      Manage Likes
                    </ListItem>
                  </Link>
                  {/* <Link to="/admin/addVoucher">
                    <ListItem>
                      <ListItemPrefix>
                        <PlusIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Voucher
                    </ListItem>
                  </Link> */}
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem onClick={() => handleLogout()}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      )}
    </div>
  );
}
