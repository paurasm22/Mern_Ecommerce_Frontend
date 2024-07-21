import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";

const ShowOrderedProducts = ({ items }) => {
  const { decreaseCartqty, removeCartItem, addToCart, clearCart } =
    useContext(AppContext);
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty = qty + items[i].qty;
        price = price + items[i].price;
      }
      setQty(qty);
      settotalPrice(price);
    }
  }, [decreaseCartqty, removeCartItem, addToCart, clearCart, items]);

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
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
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

                {/* </td> */}
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

export default ShowOrderedProducts;
