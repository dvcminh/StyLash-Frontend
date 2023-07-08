import React, { useState, useContext } from "react";
import axios from "axios";
import { Cloudinary } from "cloudinary-core";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";

const cloudinary = new Cloudinary({
  cloud_name: "djxszgsln",
  api_key: "925724911559638",
  api_secret: "SvVdpKQunbpo-AmdQQ-81JNqXUw",
});

export const Contact = () => {
  const { setNotification } = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemFormData = new FormData();
      itemFormData.append("title", title);
      itemFormData.append("description", description);
      itemFormData.append("username", userData.email);

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
          throw new Error(error);
        }
      }

      const accessToken = authContext.getAccessToken();
      const response = await axios.post(
        `http://localhost:8080/api/v1/management/createReport`,
        itemFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: "Create report successfully!",
        position: "top-right",
      });
    } catch (error) {
      setNotification({
        message: "Create report failed!",
        position: "top-right",
      });
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            title="map"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2312404166914!2d106.80047917469857!3d10.87000888928451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1684419821195!5m2!1svi!2s"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Feedback
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Write your feedback here
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Image
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
              <div className="relative mb-4">
                <label for="title" className="leading-7 text-sm text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  for="description"
                  className="leading-7 text-sm text-gray-600"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Button
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-3">
              Thanks for your feedback
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
