import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../Auth/AuthService";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage
        const response = await axios.get(
          "http://localhost:8080/categories",
          {}
        );
        const data = response.data;
        console.log("lay tu /categories");
        console.log(data);
        setCategories(data);
      } catch (error) {}
    };
    fetchCategories();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };  

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
    console.log("selectedCategory: " + selectedCategory)
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("imageFile", imageFile);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("selectedCategory", selectedCategory);
    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedProduct = response.data;
      setUploadedImageUrl(uploadedProduct.image_url);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="imageFile">Image:</label>
          <input type="file" id="imageFile" onChange={handleImageChange} />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            State
          </label>
          <div class="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              onChange={handleSelectCategory}
              value={selectedCategory}
            >
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt="Product" />
        </div>
      )}
    </div>
  );
};

export default ProductForm;
