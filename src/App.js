import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/header";
import Home from "./modules/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Profile from "./modules/Profile/profile";
import EditProfile from "./modules/EditProfile/editprofile";
import Orders from "./modules/orders/orders";
import OrderDetailPage from "./modules/OrderDetail/OrderDetail";
import PrivateRoute from "./components/misc/PrivateRoute";
import { NotificationProvider } from "./components/Context/NotificationContext";
import { AuthProvider } from "./components/Context/AuthContext";
import Notification from "./components/Notification/Notification";

function App() {
  // const { activeMenu, themeSettings} = useStateContext();
  return (
    <NotificationProvider>
      <AuthProvider>
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
                  <PrivateRoute>
                    <Header />
                    <Product />
                  </PrivateRoute>
                }
              />
              {/* <Route
            path="/adminpage"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />    */}

              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <Header />
                    <Products />
                    <Footer />
                  </PrivateRoute>
                }
              />
              <Route
                path="/categories/:name"
                element={
                  <PrivateRoute>
                    <Header />
                    <CategoryProducts />
                    <Footer />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Header />
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <PrivateRoute>
                    <Header />
                    <Contact />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sales"
                element={
                  <PrivateRoute>
                    <Header />
                    <Sales />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Header />
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <PrivateRoute>
                    <Header />
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <PrivateRoute>
                    <Header />
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/api/v1/management/getOrderDetail/:id"
                element={
                  <PrivateRoute>
                    <Header />
                    <OrderDetailPage />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path="/admin"
                element={
                  <>
                    <div className="flex relative dark:bg-main-dark-bg">
                      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg ">
                        <Sidebar />
                      </div>

                      <div
                        className={
                          "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                        }
                      >
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                          <AdminNavbar />
                        </div>

                        <AdminPage />
                      </div>
                    </div>
                  </>
                }
              />
              <Route
                path="/orders"
                element={
                  <>
                    <div className="flex relative dark:bg-main-dark-bg">
                      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg ">
                        <Sidebar />
                      </div>

                      <div className="dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full">
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                          <AdminNavbar />
                        </div>
                        <AdminOrders />
                      </div>
                    </div>
                  </>
                }
              />
              <Route
                path="/employees"
                element={
                  <>
                    <div className="flex relative dark:bg-main-dark-bg">
                      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg ">
                        <Sidebar />
                      </div>

                      <div className="dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full">
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                          <AdminNavbar />
                        </div>
                        <Employees />
                      </div>
                    </div>
                  </>
                }
              />
              <Route
                path="/customers"
                element={
                  <>
                    <div className="flex relative dark:bg-main-dark-bg">
                      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg ">
                        <Sidebar />
                      </div>

                      <div className="dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full">
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                          <AdminNavbar />
                        </div>
                        <div>
                          <Customers />
                        </div>
                      </div>
                    </div>
                  </>
                }
              /> */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="*" element={<div>404</div>} />
              {/* <ProductForm onProductSubmit={handleProductSubmit}/>
      {product && <ProductImage imageUrl={product.imageUrl} />} */}
              <Route path="/add_product" element={<ProductImageUploader />} />
            </Routes>
          </div>
        <Notification />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
