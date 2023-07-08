import React, { useState, useContext } from "react";
import { AddressBook } from "phosphor-react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Cloudinary } from "cloudinary-core";
import axios from "axios";

import IconEmailOutline from "../../assets/icon/IconEmailOutline";
import IconPhone from "../../assets/icon/IconPhone";
import "./editprofile.css";
import { NotificationContext } from "../../components/Context/NotificationContext";
import { AuthContext } from "../../components/Context/AuthContext";

const cloudinary = new Cloudinary({
  cloud_name: "djxszgsln",
  api_key: "925724911559638",
  api_secret: "SvVdpKQunbpo-AmdQQ-81JNqXUw",
});

export const EditProfile = () => {
  const { setNotification } = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );
  const [firstName, setFirstName] = useState(userData.firstname || "");
  const [lastName, setLastName] = useState(userData.lastname || "");
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || "");
  const [address, setAddress] = useState(userData.address || "");
  const [email, setEmail] = useState(userData.email || "");
  const [avatar, setAvatar] = useState(null);

  const [formValues, setFormValues] = useState(userData);

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value === "" ? null : value);
  };
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value === "" ? null : value);
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value === "" ? null : value);
  };
  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value === "" ? null : value);
  };
  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value === "" ? null : value);
  };

  const handleImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormValues((prevValues) => ({
        ...prevValues,
        avatar: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const itemFormData = new FormData();
      itemFormData.append("firstname", firstName);
      itemFormData.append("lastname", lastName);
      itemFormData.append("address", address);
      itemFormData.append("email", email);
      itemFormData.append("phone", phoneNumber);

      if (avatar) {
        try {
          const formData = new FormData();
          formData.append("file", avatar);
          formData.append("upload_preset", "tu408cqj");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${
              cloudinary.config().cloud_name
            }/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          itemFormData.append("avatar", data.secure_url);
        } catch (error) {
          setNotification({
            message: "Upload image failed!, image size is too large",
            position: "top-right",
          });
        }
      }

      const accessToken = authContext.getAccessToken();
      const response = await axios.put(
        `http://localhost:8080/api/v1/management/editUser`,
        itemFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: "Update information successfully!",
        position: "top-right",
      });
      localStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      setNotification({
        message: "Update information failed!",
        position: "top-right",
      });
    }
  };

  const handleAvatarDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setAvatar(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleAvatarDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <section className="pt-16 bg-blueGray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
          <h1 className="text-center text-3xl font-semibold leading-normal mb-2 mb-2 mt-4 header">
            Edit Profile
          </h1>
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    src={userData.avatar || "/img/avatar.png"}
                    alt="Avatar"
                    className="w-24 h-24 object-cover rounded-full m-auto"
                  />

                  <div
                    {...getRootProps()}
                    className={`flex flex-col items-start border-2 border-dashed rounded-md px-4 py-2 mt-2 ${
                      isDragActive ? "border-purple-400" : "border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="Avatar"
                        className="w-24 h-24 object-cover rounded-full"
                      />
                    ) : (
                      <p>Drag and drop an image here or click to select</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className=" mt-4">
                <h2>
                  <label htmlFor="firstname" className="font-semibold mr-2">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="outline-none border-none bg-transparent text-xl leading-normal text-blueGray-700 mb-2"
                    placeholder="First Name"
                  />{" "}
                  <label htmlFor="lastname" className="font-semibold mr-2">
                    <br />
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="outline-none border-none bg-transparent text-xl leading-normal text-blueGray-700 mb-2"
                    placeholder="Last Name"
                  />
                </h2>
                <div className="mb-2 text-blueGray-600 mt-14">
                  <AddressBook size={24} className="inline-block mr-2 mb-1" />
                  <label htmlFor="address" className="font-semibold">
                    Address:{" "}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleAddressChange}
                    className="outline-none border-none bg-transparent mb-1 text-blueGray-600"
                    placeholder="Address"
                  />
                </div>
                <div className="mb-2 text-blueGray-600 mt-5">
                  <IconEmailOutline className="inline-block mr-2 mb-2" />
                  <label htmlFor="email" className="font-semibold">
                    Email:{" "}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="outline-none border-none bg-transparent mb-2 text-blueGray-600"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2 text-blueGray-600 mt-4">
                  <IconPhone className="inline-block mr-2 mb-2" />
                  <label htmlFor="phoneNumber" className="font-semibold">
                    Phone Number:{" "}
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="outline-none border-none bg-transparent mb-2 text-blueGray-600"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      "Fashions fade, style is eternal."
                      <br />- <b>Yves Saint Laurent</b>
                    </p>
                    <button type="submit" className="font-normal text-pink-500">
                      Save Changes
                    </button>
                    <Link
                      to="/profile"
                      className="font-normal text-pink-500 ml-4"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
