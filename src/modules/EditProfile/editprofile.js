import React, { useState } from "react";
import { AddressBook } from "phosphor-react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import IconEmailOutline from "../../assets/icon/IconEmailOutline";
import IconPhone from "../../assets/icon/IconPhone";
import "./editprofile.css";

export const EditProfile = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );

  const [formValues, setFormValues] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formValues));
    setUserData(formValues);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: handleImageDrop,
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
                  <div
                    {...getRootProps()}
                    className="dropzone shadow-xl rounded-full h-auto align-middle border-none w-52 h-52 max-w-100-px max-h-100-px "
                  >
                    <input {...getInputProps()} />
                    {formValues.avatar ? (
                      <img
                        alt="..."
                        src={formValues.avatar}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-300">
                        <p>Drop image here or click to upload</p>
                      </div>
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
                    value={formValues.firstname}
                    onChange={handleChange}
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
                    value={formValues.lastname}
                    onChange={handleChange}
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
                    value={formValues.address}
                    onChange={handleChange}
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
                    value={formValues.email}
                    onChange={handleChange}
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
                    value={formValues.phoneNumber}
                    onChange={handleChange}
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
