import React, { useState } from "react";
import AuthService from "../../Auth/AuthService";

function ProductForm({ onProductSubmit }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);

    // try {
    //       const accessToken = AuthService.getAccessToken(); // Lấy token JWT từ localStorage
    //       const response = await axios.post('http://localhost:8080/api/v1/management/product', {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}` // Sử dụng token JWT trong headers của yêu cầu
    //         },
    //         body: formData,          
    //       });
    //       const data = response.data;
    //       console.log(data);
    //       setName(data.name);
    //       setImage(data.image);
    //     } catch (error) {
    //     }
    //   };

    fetch("http://localhost:8080/api/v1/management/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        onProductSubmit({
          imageUrl: data.imageUrl,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Xử lý lỗi tại đây
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="money" onChange={handlePriceChange} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" onChange={handleDescriptionChange} />
      </label>      
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductForm;
