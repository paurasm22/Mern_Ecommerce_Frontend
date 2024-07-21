import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useParams } from "react-router-dom";
const Searchproduct = () => {
  const { term } = useParams();
  const { products } = useContext(AppContext);
  const [searchedProducts, setSearchedProducts] = useState([]);
  useEffect(() => {
    setSearchedProducts(
      products.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [products, term]);
  return (
    <div>
      {term}
      <div className="container text-center">
        <h1>Related Products</h1>
        <div className="container d-flex  justify-content-center align-items-center">
          <div className="row container d-flex justify-content-center align-items-center my-5 ">
            {searchedProducts?.map((product) => (
              <div
                key={product._id}
                className=" my-3 col-md-4 d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center "
                  style={{ width: "18rem" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-items-center p-3"
                  >
                    <img
                      src={product.imgsrc}
                      className="card-img-top"
                      alt="..."
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "20px",
                        border: "2px solid yellow",
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="d-flex my-3">
                      <button href="#" className="btn btn-primary mx-3 ">
                        ₹ {product.price}
                      </button>
                      <button href="#" className="btn btn-warning">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
                {/* <h1>{product.title}</h1> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchproduct;
