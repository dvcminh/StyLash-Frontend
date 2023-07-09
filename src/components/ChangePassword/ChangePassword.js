import React, { useState, useContext } from "react";
import axios from "axios";
import { NotificationContext } from "../Context/NotificationContext";

export const ChangePassword = () => {
  const { setNotification } = useContext(NotificationContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("userData"));

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      // Xử lý trường hợp nhập thiếu
      alert("Please enter all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      // Xử lý trường hợp confirm password khác new password
      alert("Confirm password is not match");
      return;
    }

    // Tiến hành xử lý khi thông tin hợp lệ
    try {
      const accessToken = localStorage.getItem("accessToken");
      const itemFormData = new FormData();
      itemFormData.append("oldpassword", oldPassword);
      itemFormData.append("newpassword", newPassword);
      itemFormData.append("email", user.email);
      const response = await axios.put(
        "http://localhost:8080/api/v1/management/changePassword",
        itemFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      if (data === "Wrong old password") {
        alert(data);
      } else {
        setNotification({
          type: "alert",
          message: "Change password successfully",
          position: "top-right",
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                for="old-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                name="old-password"
                id="old-password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-300 hover:text-white"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
