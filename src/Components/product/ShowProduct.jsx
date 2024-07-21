import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate("/info");
  };

  return (
    <>
      <div className="info">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row container d-flex justify-content-center align-items-center my-5">
            {filteredData?.map((product) => (
              <div
                key={product._id}
                className="my-3 col-md-4 d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "20rem" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-items-center p-3"
                  >
                    <img
                      src={product.imgsrc}
                      className="card-img-top"
                      alt={product.title}
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
                    <div className="d-flex my-3 justify-content-center">
                      <button href="#" className="btn btn-primary mx-3">
                        ₹ {product.price}
                      </button>
                      <button
                        onClick={() => {
                          addToCart(
                            product._id,
                            product.title,
                            product.price,
                            product.qty,
                            product.imgsrc
                          );
                        }}
                        href="#"
                        className="btn btn-warning"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="floating-info-button" onClick={handleInfoClick} title="Info">
        <strong>i</strong>
      </div>
    </>
  );
};

export default ShowProduct;
