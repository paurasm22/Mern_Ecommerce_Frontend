import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("no_filter");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setFilteredData,
    products,
    filteredData,
    logout,
    isAuthenticated,
    cart,
    admin,
  } = useContext(AppContext);

  useEffect(() => {
    // Log products and filteredData when the component mounts or updates
    console.log("Products:", products);
    console.log("Filtered Data:", filteredData);
  }, [products, filteredData]);

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchTerm("");
    navigate(`/product/search/${searchTerm}`);
  };

  const filterByCategory = (cat) => {
    console.log("Category clicked:", cat);
    setSelectedCategory(cat);
    if (cat === "no_filter") {
      setFilteredData(products);
    } else {
      const filtered = products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      );
      console.log("Filtered products:", filtered);
      setFilteredData(filtered);
    }
  };

  const filterByPrice = (price) => {
    console.log("Price clicked:", price);
    setSelectedPrice(price);
    const filtered = products.filter((data) => data.price <= price);
    console.log("Filtered products:", filtered);
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white" }}
            className="left"
          >
            <h3>MERN E Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input
              value={searchTerm}
              placeholder="Search Products"
              required
              type="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                {!admin && (
                  <>
                    <Link
                      to={"/cart"}
                      type="button"
                      className="btn btn-primary position-relative"
                    >
                      <span className="material-symbols-outlined mx-3">
                        shopping_cart
                      </span>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart?.items.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </>
                )}

                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                {admin && (
                  <Link to="/admin" className="btn btn-warning mx-3">
                    Admin
                  </Link>
                )}
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to="/login" className="btn btn-warning mx-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {location.pathname === "/" && (
        <div className="sub_bar">
          <div
            className={`items ${
              selectedCategory === "no_filter" ? "selected" : ""
            }`}
            onClick={() => filterByCategory("no_filter")}
          >
            No Filter
          </div>
          <div
            className={`items ${
              selectedCategory === "mobiles" ? "selected" : ""
            }`}
            onClick={() => filterByCategory("mobiles")}
          >
            Mobiles
          </div>
          <div
            className={`items ${
              selectedCategory === "laptops" ? "selected" : ""
            }`}
            onClick={() => filterByCategory("laptops")}
          >
            Laptops
          </div>
          <div
            className={`items ${
              selectedCategory === "cameras" ? "selected" : ""
            }`}
            onClick={() => filterByCategory("cameras")}
          >
            Camera
          </div>
          <div
            className={`items ${
              selectedCategory === "headphones" ? "selected" : ""
            }`}
            onClick={() => filterByCategory("headphones")}
          >
            Headphones
          </div>
          <div
            className={`items ${selectedPrice === 999 ? "selected" : ""}`}
            onClick={() => filterByPrice(999)}
          >
            999
          </div>
          <div
            className={`items ${selectedPrice === 4999 ? "selected" : ""}`}
            onClick={() => filterByPrice(4999)}
          >
            4999
          </div>
          <div
            className={`items ${selectedPrice === 9999 ? "selected" : ""}`}
            onClick={() => filterByPrice(9999)}
          >
            9999
          </div>
          <div
            className={`items ${selectedPrice === 99999 ? "selected" : ""}`}
            onClick={() => filterByPrice(99999)}
          >
            99999
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
