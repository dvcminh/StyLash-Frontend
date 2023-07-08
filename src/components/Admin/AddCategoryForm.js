import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../components/Context/AuthContext";
import { NotificationContext } from "../../components/Context/NotificationContext";
import { useParams } from "react-router-dom";

export const AddCategoryForm = () => {
  const authContext = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemFormData = new FormData();
      itemFormData.append("name", name);
      itemFormData.append("description", description);

      const accessToken = authContext.getAccessToken();
      const response = await axios.post(
        `http://localhost:8080/categories`,
        itemFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: "Update category successfully!",
        position: "top-right",
      });
    } catch (error) {
      setNotification({
        message: "Update category failed!",
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen sm:justify-center sm:pt-0 mb-10">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Add Category
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="description">
                  Description
                </label>
                <input
                  id="text"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoComplete="description"
                  required
                  className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                />
              </div>
            </div>       
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Category
            </button>     
          </form>
        </div>
      </div>
    </div>
  );
};
