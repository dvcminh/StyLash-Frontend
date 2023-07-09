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

const cloudinary = new Cloudinary({
  cloud_name: "djxszgsln",
  api_key: "925724911559638",
  api_secret: "SvVdpKQunbpo-AmdQQ-81JNqXUw",
});

const UpdateProductForm = () => {
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

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        const data = response.data;
        setProduct(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category.name);  
        setImage(data.image_url);
        
      } catch (error) {}
    };
      fetchProducts();
}, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = authContext.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get(
          "http://localhost:8080/categories",
          {}
        );
        const data = response.data;
        setCategories(data);
      } catch (error) {}
    };
    fetchCategories();
  }, []);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value === "" ? null : value);
  };
  
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value === "" ? null : value);
  };
  

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };


  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
    console.log("category: " + category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemFormData = new FormData();
      itemFormData.append("name", name);
      itemFormData.append("description", description);
      itemFormData.append("price", price);
      itemFormData.append("category", category);

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
          itemFormData.append("image", data.secure_url);          
        } catch (error) {
          throw new Error(error);
        }
      }

      const accessToken = authContext.getAccessToken();
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/updateProduct/${id}`,
        itemFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotification({
        message: 'Update product successfully!',
        position: 'top-right'
      });
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
    <div>
      <div className="flex flex-col items-center min-h-screen sm:justify-center sm:pt-0">
        <div>
          <h3 className="text-4xl font-bold" style={{ color: "#00ADB5" }}>
            Update Product
          </h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Product Image
              </label>
              <img src={image} alt="Avatar" className="w-24 h-24 object-cover rounded-full" />

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
            <div className="">
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Product Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={name}
                    onChange={handleNameChange}
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
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Price
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
            <div className="mt-4">
              <div className="flex flex-col">
                <span className="block text-sm font-medium text-gray-700 undefined">
                  Category
                </span>
                <div className="">
                  <select
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-00ADB5-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={handleSelectCategory}
                    value={category}
                  >
                    {categories.map((category) => (
                      <option key={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;

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
