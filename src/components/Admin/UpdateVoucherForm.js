import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import AuthService from "../../Auth/AuthService";
import { AuthContext } from "../../components/Context/AuthContext";
import { CloudinaryContext, Image } from "cloudinary-react";
import { v4 as uuidv4 } from "uuid";
import { Cloudinary } from "cloudinary-core";
import axios from "axios";
import { NotificationContext } from "../../components/Context/NotificationContext";

// import "./RegisterForm.css";

const UpdateVoucherForm = () => {
  const { setNotification } = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [code, setCode] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [expiration, setExpiration] = useState("");
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get(
          `http://localhost:8080/api/vouchers/getById/${id}`
        );
        const data = response.data;
        setProduct(data);
        setCode(data.code);
        setDescription(data.description);
        setPrice(data.discount);
        setTitle(data.title);
        setExpiration(data.expirationDate);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setCode(value === "" ? null : value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(event.target.value);
  };

  const handleExpirationChange = (event) => {
    const value = event.target.value;
    setExpiration(value === "" ? null : value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemFormData = new FormData();
      itemFormData.append("code", code);
      itemFormData.append("description", description);
      itemFormData.append("price", price);
      itemFormData.append("title", title);
      itemFormData.append("expirationDate", expiration);

      const accessToken = authContext.getAccessToken();
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/update-voucher/${id}`,
        itemFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("update voucher");
      console.log(response.data);
      setNotification({
        message: "Update voucher successfully!",
        position: "top-right",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen sm:justify-center sm:pt-0">
        <div>
          <h3 className="text-4xl font-bold" style={{ color: "#00ADB5" }}>
            Update Voucher
          </h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Voucher Code
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Description
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="description"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Title
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="title"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Expiration
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="description"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={expiration}
                  onChange={handleExpirationChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Discount
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="price"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Update Voucher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVoucherForm;

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
