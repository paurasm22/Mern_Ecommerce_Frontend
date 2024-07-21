import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { addToCart } from "../../../../API/Controller/cart";
import { Link, useNavigate } from "react-router-dom";
import TableProducts from "../TableProducts";
import axios from "axios";
const Checkout = () => {
  const {
    cart,
    decreaseCartqty,
    removeCartItem,
    addToCart,
    clearCart,
    useraddress,
    url,
    getAddress,
    userDetails,
  } = useContext(AppContext);
  // console.log(useraddress);
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
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
      getAddress();
      // window.location.reload();
    }
  }, [decreaseCartqty, removeCartItem, addToCart, clearCart]);

  // button function to handle razorpay payment route

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: totalPrice,
        qty: qty,
        cartItems: cart?.items,
        userShipping: useraddress,
        userId: userDetails._id,
      });
      // console.log("Order Response", orderResponse);
      const { orderId, amount: orderAmount } = orderResponse.data;
      var options = {
        key: "rzp_test_IqWHz96pvX48FS", // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Pauras Web Project",
        description: "Pauras Web Project test transaction",
        // "image": "https://example.com/your_logo",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: userDetails._id,
            userShipping: useraddress,
          };
          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );
          {
            if (api.data.sucess) {
              clearCart();
              navigate("/orderconfirmation");
            }
          }

          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: {
          name: "Pauras Web Project",
          email: "paurasmore22@gmail.com",
          contact: "0000000000",
        },
        notes: {
          address: "Mars",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <center>
        <h1 style={{ marginTop: "30px" }}>Order Summary</h1>
      </center>
      {/* <div className="values">
        <button className=" yellowbutton"> Total Quantity : {qty}</button>
        <button className="redbutton">Total Price : ₹ {totalPrice}</button>
      </div> */}
      <div className="container">
        <table className="table table-bordered border-primary bg-dark">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light">
                Product Details
              </th>

              <th className="bg-dark text-light" scope="col">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td className="bg-dark text-light">
                <TableProducts cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul>
                  <li> Name : {useraddress?.fullname}</li>
                  <li> Country : {useraddress?.country}</li>
                  <li>State : {useraddress?.state}</li>
                  <li> City : {useraddress?.city}</li>
                  <li>Address / Near by : {useraddress?.address} </li>
                  <li>Pincode : {useraddress?.pincode}</li>
                  <li>Phone Number : {useraddress?.phoneNumber}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="container text-center my-5">
          <button
            onClick={handlePayment}
            className="btn btn-warning text-center "
            style={{
              padding: "10px",
              fontWeight: "800",
              fontSize: "large",
              width: "500px",
            }}
          >
            Proceed To Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
