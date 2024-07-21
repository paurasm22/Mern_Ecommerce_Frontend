import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    decreaseCartqty,
    removeCartItem,
    addToCart,
    clearCart,
    getUserCart,
  } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
      setQty(qty);
      settotalPrice(price);
    }
  }, [decreaseCartqty, removeCartItem, addToCart, clearCart, cart]);

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <>
      <div className="values text-center my-4">
        <button className="btn btn-warning mx-2">Total Quantity: {qty}</button>
        <button className="btn btn-danger mx-2">
          Total Price: ₹ {totalPrice}
        </button>
      </div>
      <div className="container">
        {cart?.items?.length === 0 ? (
          <div className="text-center">
            <h1>Cart Is Empty !!</h1>
            <Link className="btn btn-primary mt-3" to="/">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cart?.items?.map((product) => (
              <div className="row cart-item my-3 p-3" key={product.productId}>
                <div className="col-3">
                  <img
                    src={product?.imgSrc}
                    alt={product.title}
                    className="img-fluid rounded"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                  <h3>{product?.title}</h3>
                  <h5>Price: ₹ {product?.price}</h5>
                  <h5>Qty: {product.qty}</h5>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-around">
                  <button
                    onClick={() => decreaseCartqty(product.productId, 1)}
                    className="btn btn-info"
                  >
                    <span className="material-symbols-outlined">
                      arrow_cool_down
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        product.qty,
                        product.imgSrc
                      )
                    }
                    className="btn btn-warning"
                  >
                    <span className="material-symbols-outlined">
                      arrow_warm_up
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to remove this from Cart?"
                        )
                      ) {
                        removeCartItem(product.productId);
                      }
                    }}
                    className="btn btn-danger"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center my-4">
              <Link to="/shipping" className="btn btn-warning mx-3">
                Check Out
              </Link>
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  if (confirm("Clear Cart? All the items will be deleted")) {
                    clearCart();
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
