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
import Sidebar from "./components/Sidebar/Sidebar";
import { UserData } from "./Data";
import BarChart from "./components/Chart/BarChart";
import LineChart from "./components/Chart/LineChart";
import PieChart from "./components/Chart/PieChart";
import Customer from "./components/Admin/Customer";
import AdminOrders from "./components/Admin/Orders";
import AdminProducts from "./components/Admin/Products";
import Admin from "./components/Admin/Admin";
import UpdateProductForm from "./components/Admin/UpdateProductForm";
import Category from "./components/Admin/Category";
import { UpdateCategoryForm } from "./components/Admin/UpdateCategoryForm";
import { AddCategoryForm } from "./components/Admin/AddCategoryForm";
import AddProductForm from "./modules/UploadProduct/ProductForm";
import OrdersDetail from "./components/Admin/OrdersDetail";
import Vouchers from "./components/Admin/Voucher";
import UpdateVoucherForm from "./components/Admin/UpdateVoucherForm";
import AddVoucherForm from "./components/Admin/AddVoucherForm";
import Likes from "./components/Admin/Like";
import Report from "./components/Admin/Report";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { Management } from "./components/Admin/Management";
import Wishlist from "./components/Wishlist/Wishlist";

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
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
              path="/changePassword"
              element={
                <PrivateRoute>
                  <Header />
                  <ChangePassword />
                  <Footer />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories/:name"
              element={
                <>
                  <Header />
                  <CategoryProducts />
                </>
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
              path="/wishlist"
              element={
                <PrivateRoute>
                  <Header />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <Wishlist />
                  </section>
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
            <Route
              path="/admin/dashboard"
              element={
                <>
                  <Sidebar />
                  <Admin />

                  {/* <div className="chart-item">
                      <PieChart chartData={userData} />
                    </div> */}
                  {/* <div className="chart-item mt-12 m-auto">
                    <LineChart chartData={userData} />
                  </div> */}
                </>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <AdminOrders />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <OrdersDetail />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/products"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <AdminProducts />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/update-product/:id"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <UpdateProductForm />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <Customer />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/addProduct"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    {/* <ProductForm onProductSubmit={handleProductSubmit} />
                    {product && <ProductImage imageUrl={product.imageUrl} />} */}
                    <AddProductForm />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/category"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <Category />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/updateCategory/:id"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <UpdateCategoryForm />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/addCategory/"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <AddCategoryForm />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/voucher/"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <Vouchers />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/updateVoucher/:id"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <UpdateVoucherForm />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/addVoucher"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <AddVoucherForm />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/likes"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <Likes />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <Report />
                  </section>
                </>
              }
            />
            <Route
              path="/admin/management"
              element={
                <>
                  <Sidebar />
                  <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear mt-20">
                    <Management />
                  </section>
                </>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<div>404</div>} />
            <Route path="/add_product" element={<ProductImageUploader />} />
          </Routes>
        </div>
        <Notification />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
