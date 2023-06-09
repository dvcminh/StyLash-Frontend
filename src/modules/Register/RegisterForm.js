import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import AuthService from "../../Auth/AuthService";
import { CloudinaryContext, Image } from "cloudinary-react";
import { v4 as uuidv4 } from "uuid";
import { Cloudinary } from "cloudinary-core";

import "./RegisterForm.css";

const cloudinary = new Cloudinary({
  cloud_name: "djxszgsln",
  api_key: "925724911559638",
  api_secret: "SvVdpKQunbpo-AmdQQ-81JNqXUw",
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerData = {
        firstname,
        lastname,
        email,
        password,
        phone_number,
        address,
        role: "MANAGER",
      };
  
      if (avatar) {
        try {
          const formData = new FormData();
          formData.append("file", avatar);
          formData.append("upload_preset", "tu408cqj");
    
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
    
          const data = await response.json();
          registerData.avatar = data.secure_url;
          console.log("data" + data)
          console.log("data.secure_url" + data.secure_url);
        }
        catch (error) {
          console.log("error: " + error);
        }        
      }
  
      // Submit registerData to backend
      const response = await AuthService.register(registerData);
      AuthService.setAccessToken(response.access_token);
      AuthService.setRefreshToken(response.refresh_token);
      setError("Successfully registered");
      navigate("/login");
    } catch (error) {
      setError(error.message);
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
    <div className="background">
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-dark-50 border">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-red-600">Sign up</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Avatar
              </label>
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
            <div className="md:flex">
              <div className="mr-8 mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  First Name
                </label>
                <div className="flex items-start">
                  <input
                    type="text"
                    name="name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Last Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex">
              <div className="mt-4 mr-10">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Phone Number
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="phone_number"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setPhone_number(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Address
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="address"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
            {error && <p>{error}</p>}
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link className="text-purple-600 hover:underline" to="/login">
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

// <form onSubmit={handleSubmit}>
//   <input
//     type="text"
//     placeholder="First Name"
//     value={firstname}
//     onChange={(e) => setFirstname(e.target.value)}
//   />
// <input
//   type="text"
//   placeholder="Last Name"
//   value={lastname}
//   onChange={(e) => setLastname(e.target.value)}
// />
//   <input
//     type="email"
//     placeholder="Email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//   />
//   <input
//     type="password"
//     placeholder="Password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
//   <button type="submit">Register</button>
//   {error && <p>{error}</p>}
// </form>
