import React, { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";

const Addproducts = () => {
  const { addProducts } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [price, setprice] = useState();
  const [category, setcategory] = useState("");
  const [imgSrc, setimgSrc] = useState("");

  const handleSubmit = () => {
    console.log(title);
    console.log(Description);
    console.log(price);
    console.log(category);
    console.log(imgSrc);
    addProducts(title, Description, price, category, imgSrc);
  };
  return (
    <div className="add-products-container">
      <div className="form-container bg-dark">
        <div className="form-group">
          <label htmlFor="title">Enter Title</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Enter Description</label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Enter Price</label>
          <input
            type="text"
            id="price"
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Enter Category</label>
          <select id="category" onChange={(e) => setcategory(e.target.value)}>
            <option value="mobiles">mobiles</option>
            <option value="cameras">cameras</option>
            <option value="headphones">headphones</option>
            <option value="laptops">laptops</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imageSource">Enter Image Source</label>
          <input
            type="text"
            id="imageSource"
            onChange={(e) => setimgSrc(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-info text-center "
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Addproducts;
