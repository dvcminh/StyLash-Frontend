import React, {useEffect, useState, useContext} from "react";
import { ShoppingBag, Users, List ,Storefront } from "phosphor-react";
import axios from "axios";
import { AuthContext } from "../../components/Context/AuthContext";

import "./statcard.css";
const Stats = () => {
  const authContext = useContext(AuthContext);
  const [numberCategories, setNumberCategories] = useState(0);
  const [numberProducts, setNumberProducts] = useState(0);
  const [numberUsers, setNumberUsers] = useState(0);

  const fetchNumberCategories = async () => {

    try {
      const accessToken = authContext.getAccessToken();
      const response = await axios.get(
        "http://localhost:8080/categories/count",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },          
        }
      );
      const data = response.data;
      setNumberCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNumberProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/count",
      );
      const data = response.data;
      setNumberProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNumberUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/countUsers",
      );
      const data = response.data;
      setNumberUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNumberCategories();
    fetchNumberProducts();
    fetchNumberUsers();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">
            Discover Endless Possibilities with StyLash
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            StyLash is here to revolutionize your online shopping experience.
            With an extensive range of products and unbeatable deals, we bring
            you the ultimate destination for all your shopping needs. Whether
            you're searching for the latest fashion trends, home decor
            essentials, electronics, or unique gifts, we've got you covered.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <ShoppingBag
                size={64}
                className="w-12 h-12 mb-3 inline-block icon"
              />
              <h2 className="title-font font-medium text-3xl text-white">
                {numberProducts}
              </h2>
              <p className="leading-relaxed">Products</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <Users
                size={64}
                className="w-12 h-12 mb-3 inline-block icon"
              />

              <h2 className="title-font font-medium text-3xl text-white">
                {numberUsers}
              </h2>
              <p className="leading-relaxed">Users</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <List
                size={64}
                className="w-12 h-12 mb-3 inline-block icon"
              />
              <h2 className="title-font font-medium text-3xl text-white">
                {numberCategories}
              </h2>
              <p className="leading-relaxed">Categories</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <Storefront
                size={64}
                className="w-12 h-12 mb-3 inline-block icon"
              />
              <h2 className="title-font font-medium text-3xl text-white">
                1
              </h2>
              <p className="leading-relaxed">Stores</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
