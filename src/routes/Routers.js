import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChangePassword from "../pages/ChangePassword";
import Profile from "../pages/Profile";
import Order from "../pages/Order";
import Detail from "../pages/Detail";
import SuccessPage from "../pages/SuccessPage";
import ErrorPage from "../pages/ErrorPage";
import Review from "../pages/Review";
import AddBalance from "../pages/AddBalance";

import AddProduct from "../pages/Admin/Products/AddProduct";
import Products from "../pages/Admin/Products/Products";
import AdminCategory from "../pages/Admin/Category/Categories";
import AddCategory from "../pages/Admin/Category/AddCategory";
import AdminOrder from "../pages/Admin/Orders/Orders";
import AdminOrderDetails from "../pages/Admin/Orders/OrderDetails";
import AdminRating from "../pages/Admin/Rating/Rating";
import AdminCustomer from "../pages/Admin/Customer/Customer";
import CustomerDetail from "../pages/Admin/Customer/CustomerDetail";
import CreateUser from "../pages/Admin/Customer/CreateUser";
import Admin from "../pages/Admin/Admin";
import EditProduct from "../pages/Admin/Products/EditProduct";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update-password" element={<ChangePassword />} />
      <Route path="/order" element={<Order />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/review/:id" element={<Review />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-balance" element={<AddBalance />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />

      {/* admin */}
      <Route path="/admin/product/:id" element={<EditProduct />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/addProduct" element={<AddProduct />} />
      <Route path="/admin/categories" element={<AdminCategory />} />
      <Route path="/admin/addCategory" element={<AddCategory />} />
      <Route path="/admin/orders" element={<AdminOrder />} />
      <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
      <Route path="/admin/product/:id/reviews" element={<AdminRating />} />
      <Route path="/admin/users" element={<AdminCustomer />} />
      <Route path="/admin/addUser" element={<CreateUser />} />
      <Route path="/admin/users/:id" element={<CustomerDetail />} />
    </Routes>
  );
};

export default Routers;
