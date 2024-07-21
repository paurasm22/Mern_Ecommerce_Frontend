import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";

const TableProducts = ({ cart }) => {
  const { decreaseCartqty, removeCartItem, addToCart, clearCart } =
    useContext(AppContext);
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty = qty + cart.items[i].qty;
        price = price + cart.items[i].price;
      }
      setQty(qty);
      settotalPrice(price);
    }
  }, [decreaseCartqty, removeCartItem, addToCart, clearCart]);

  const [qty, setQty] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  return (
    <div>
      {" "}
      <table class="table table-bordered border-primary bg-dark">
        <thead className="bg-dark text-light">
          <tr className="bg-dark text-light">
            <th className="bg-dark text-light" scope="col">
              Product Img
            </th>
            <th scope="col" className="bg-dark text-light">
              Title
            </th>
            <th scope="col" className="bg-dark text-light">
              Price
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty--
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty++
            </th>
            <th scope="col" className="bg-dark text-light">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <>
              {" "}
              <tr>
                <th scope="row" className="bg-dark text-light">
                  <img
                    src={product?.imgSrc}
                    alt={product.title}
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "20px",
                    }}
                  />
                </th>
                <td className="bg-dark text-light text-center center-text ">
                  {product?.title}
                </td>
                <td className="bg-dark text-light"> ₹ {product?.price}</td>
                <td className="bg-dark text-light"> {product.qty}</td>
                <td className="bg-dark text-light">
                  {" "}
                  <button
                    onClick={() => decreaseCartqty(product.productId, 1)}
                    className="btn btn-info mx-2"
                  >
                    <span class="material-symbols-outlined">remove</span>
                  </button>
                </td>
                <td className="bg-dark text-light">
                  <button
                    onClick={() => {
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        product.qty,
                        product.imgsrc
                      );
                    }}
                    className="btn btn-warning mx-2"
                  >
                    <span class="material-symbols-outlined">add</span>
                  </button>
                </td>
                <td className="bg-dark text-light">
                  {" "}
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to remove this from Cart ? "
                        )
                      ) {
                        removeCartItem(product.productId);
                      }
                    }}
                    className="btn btn-danger mx-2"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            </>
          ))}
          <tr>
            <th className="bg-dark text-light" colSpan={2}>
              Total
            </th>
            <th className="bg-dark text-light">{totalPrice}</th>
            <th className="bg-dark text-light">{qty}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableProducts;
