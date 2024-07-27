import React, { useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppState = (props) => {
  const [alladminOrders, setAllOrders] = useState();
  const data = 10;
  const [allUsers, setAllUsers] = useState();
  const [admin, setAdmin] = useState(false);
  const url = "http://localhost:1000/api";
  // const url = "https://mern-ecommerce-api-rqy5.onrender.com/api";
  const [token, setToken] = useState("");
  const [userDetails, setuserDetails] = useState();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cart, setCart] = useState();
  const [useraddress, setUserAddress] = useState("");

  const [userOrder, setUserOrder] = useState([]);
  // to add addresses
  const shippingAddress = async (
    fullname,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullname, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    return api;
    setCart(api.data.cart);
    // console.log("USer cart", api.data.cart);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
    };
    fetchProducts();
    userProfile();
    getAddress();
    getUserorders();
    gatAllUsers();
    allOrders();
    const savedAdmin = localStorage.getItem("admin");
    try {
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }
    } catch (error) {
      console.error("Error parsing savedAdmin from localStorage:", error);
      setAdmin(false); // Or any default value you prefer
    }
  }, [token]);

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setisAuthenticated(true);
    }
    // console.log("Token is ", lstoken);
  }, []);
  // register user
  const register = async (name, email, passwd) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password: passwd },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    console.log("user registered", api);
    return api.data;
  };
  // login user
  const login = async (email, passwd) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password: passwd },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    console.log("user Login", api.data);
    console.log("Is admin", api.data.admin);
    localStorage.setItem("admin", api.data.admin);
    setAdmin(api.data.admin);
    setToken(api.data.token);
    localStorage.setItem("token", api.data.token);
    setisAuthenticated(true);
    alert(
      "This is not a final build .Many bugs are yet to be fixed ! Reload Page if problem loading data . Press OK to continue "
    );
    return api.data;
  };

  // to logout

  const logout = () => {
    setisAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    toast.success("Logged Out Sucessfully !! ", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    window.location.reload();
  };

  // user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log(api.data.user);
    setuserDetails(api.data.user);
  };

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty: 1, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log("My Cart", api);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  //decrease qty;
  const decreaseCartqty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    // setCart(api.data.cart);
    // console.log("USer cart", api.data.cart);
  };

  // to remove a product
  const removeCartItem = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    // setCart(api.data.cart);
    // console.log("USer cart", api.data.cart);
  };

  // clear user cart
  const clearCart = async (prouctId) => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    toast.error(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    // setCart(api.data.cart);
    // console.log("USer cart", api.data.cart);
  };

  // get user cart

  const getUserCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setCart(api.data.cart);
    // console.log("USer cart", api.data.cart);
  };
  // getUserCart use effect ;
  useEffect(() => {
    getUserCart();
  }, [addToCart]);
  // get recent user address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setUserAddress(api?.data?.userAddress);
  };

  //get user order
  const getUserorders = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("User order", api.data);
    setUserOrder(api.data);
  };

  // admin exclusives

  const deleteProduct = async (id) => {
    const api = await axios.delete(`${url}/product/${id}`, {
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    });
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    window.location.reload();
    // setProducts(api.data.products);
  };

  // add products admin side
  const addProducts = async (title, Description, price, category, imgSrc) => {
    const api = await axios.post(
      `${url}/product/add`,
      {
        title: title,
        description: Description,
        price: price,
        category: category,
        qty: 1,
        imgsrc: imgSrc,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          // Auth: token,
        },
        withCredentials: true,
      }
    );
    // console.log("My Cart", api);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const gatAllUsers = async () => {
    const api = await axios.get(`${url}/user/all`, {
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    });
    console.log("All Users", api?.data);
    setAllUsers(api?.data);
  };

  // get all orders

  const allOrders = async () => {
    const api = await axios.get(`${url}/payment/allorders`, {
      headers: {
        "Content-Type": "Application/json",
        // Auth: token,
      },
      withCredentials: true,
    });
    console.log("All the orders : ", api.data);
    setAllOrders(api.data);
    // console.log(api.data.user);
    // setuserDetails(api.data.user);
  };
  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        token,
        isAuthenticated,
        url,
        setisAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        userDetails,
        addToCart,
        cart,
        decreaseCartqty,
        removeCartItem,
        clearCart,
        shippingAddress,
        useraddress,
        getAddress,
        getUserorders,
        userOrder,
        getUserCart,
        admin,
        deleteProduct,
        addProducts,
        allUsers,
        alladminOrders,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
