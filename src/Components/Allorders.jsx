import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
// Import the CSS file for styling

const Allorders = () => {
  const { alladminOrders } = useContext(AppContext);

  return (
    <div className="orders-container container">
      {alladminOrders.map((order) => (
        <div key={order._id} className="order-card">
          <h2>Order ID: {order.orderId}</h2>
          <h3>User: {order.userShipping.fullname}</h3>
          <h3>Ordered Items:</h3>
          {order.orderItems.map((item, index) => (
            <div key={index} className="item-card">
              <img src={item.imgSrc} alt={item.title} className="item-image" />
              <div className="item-details">
                <h4>Product Name: {item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.qty}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Allorders;
