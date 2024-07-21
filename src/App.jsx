import React, { useContext } from "react";
import AppContext from "./Context/AppContext";
import ShowProduct from "./Components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Productdetail from "./Components/product/Productdetail";
import Navbar from "./Components/user/Navbar";
import Searchproduct from "./Components/product/Searchproduct";
import Register from "./Components/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/user/Login";
import Profile from "./Components/user/Profile";
import Cart from "./Components/user/Cart";
import Address from "./Components/user/Address";
import Checkout from "./Components/user/Checkout";
import OrderConmfirmation from "./Components/user/OrderConmfirmation";
import Info from "./Components/Info";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/product/search/:term" element={<Searchproduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmation" element={<OrderConmfirmation />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
