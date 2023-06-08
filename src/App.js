import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./modules/Home/home";
import { Routes, Route } from "react-router-dom";
import Product from "./modules/Product/product";
import Products from "./modules/Products/products";
import CategoryProducts from "./modules/CategoryProducts";
import Cart from "./modules/Cart/cart";
import Contact from "./components/Contact/contact";
import LoginForm from "./modules/Login/LoginForm";
import RegisterForm from "./modules/Register/RegisterForm";
import ProductForm from "./modules/Form/form";
import ProductImage from "./modules/Products/productImage";
import { useState } from "react";
import ProductImageUploader from "./modules/UploadProduct/ProductForm";
import Sales from "./modules/Sales/sales";

function App() {
  const [product, setProduct] = useState(null);

  const handleProductSubmit = (data) => {
    setProduct(data);
  };

  return (
    <div className="App-background">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/api/products/:id"
          element={
            <>
              <Header />
              <Product />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Header />
              <Products />
              <Footer />
            </>
          }
        />
        <Route
          path="/categories/:name"
          element={
            <>
              <Header />
              <CategoryProducts />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
            </>
          }
        />
        <Route
          path="/sales"
          element={
            <>
              <Header />
              <Sales />
            </>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<div>404</div>} />
        {/* <ProductForm onProductSubmit={handleProductSubmit}/>
      {product && <ProductImage imageUrl={product.imageUrl} />} */}
        <Route path="/add_product" element={<ProductImageUploader />} />
      </Routes>
    </div>
  );
}

export default App;
