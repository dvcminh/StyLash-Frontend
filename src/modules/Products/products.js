import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories/categories";
import ProductCard from "../../components/ProductCard/productcard";
import Loading from "../Loading/loading";

import axios from "axios";

import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (sort) => {
    setSortOrder(sort);
  };


  const fetchProducts = async () => {
    try {
      console.log("searchTerm: " + searchTerm);
      console.log("sortOrder: " + sortOrder);
      const response = await axios.get(
        "http://localhost:8080/api/products/getAllProducts",
        {
          params: {
            name: searchTerm,
            sort: sortOrder,
          },
        }
      );
      const data = response.data;
      console.log("lay tu /products");
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, sortOrder]);

  return (
    <div>
      <Categories />
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs tracking-widest font-medium title-font mb-1 title">
          PRODUCTS
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white-900">
          ALL PRODUCTS
        </h1>

        <form className="m-10">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search products"
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700 active:bg-gray-900"
            onClick={() => handleSort("all")}
          >
            All
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700 active:bg-gray-900"
            onClick={() => handleSort("asc")}
          >
            Sort A-Z
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700 active:bg-gray-900"
            onClick={() => handleSort("desc")}
          >
            Sort Z-A
          </button>
        </div>
      </div>
      {products.length > 0 ? (
        <ProductCard products={products} />
      ) : (
        <Loading size={50} />
      )}
    </div>
  );
};

export default Products;
