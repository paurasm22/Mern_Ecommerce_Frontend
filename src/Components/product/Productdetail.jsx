import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";

const Productdetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const url = "http://localhost:1000/api";
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.product);
      setProduct(api.data.product);
      // setProducts(api.data.products);
    };
    fetchProducts();
  }, [id]);
  return (
    <div>
      <>
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div className="left">
            <img
              src={product?.imgsrc}
              alt=""
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "20px",
                border: "4px solid yellow",
              }}
            />
          </div>
          <div className="right">
            <h1>{product?.title}</h1>
            <p style={{ margin: "50px", fontSize: "20px" }}>
              {product?.description}
            </p>
            <h1> ₹ {product?.price}</h1>
            <div className="my-5">
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "700" }}
              >
                Buy Now
              </button>
              <button className="btn btn-warning" style={{ fontWeight: "700" }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <RelatedProduct category={product?.category} />
      </>
    </div>
  );
};

export default Productdetail;
