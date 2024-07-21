import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import ShowOrderedProducts from "../ShowOrderedProducts";

const OrderConmfirmation = () => {
  const [latestOrder, setLatestOrder] = useState({});
  const { getUserorders, userOrder } = useContext(AppContext);
  useEffect(() => {
    getUserorders(); // Call getUserorders here
  }, []);

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  console.log("The latest order of the user ", latestOrder);
  return (
    <>
      <div className="container  my-5">
        <h1 className="text-center">Your Order has been Confirmed</h1>
        <h3 className="text-center">It will be delivered Soon </h3>
      </div>
      <div className="container">
        <table className="table table-bordered border-primary bg-dark">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light">
                Ordered Items
              </th>

              <th className="bg-dark text-light" scope="col">
                Order Details & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td className="bg-dark text-light">
                <ShowOrderedProducts items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul>
                  <li> Order Id : {latestOrder?.orderId}</li>
                  <li> Payment Id : {latestOrder?.paymentId}</li>
                  <li> Pay Status : {latestOrder?.payStatus}</li>
                  <li> Name : {latestOrder?.userShipping?.fullname}</li>
                  <li> Country : {latestOrder?.userShipping?.country}</li>
                  <li>State : {latestOrder?.userShipping?.state}</li>
                  <li> City : {latestOrder?.userShipping?.city}</li>
                  <li>
                    Address / Near by : {latestOrder?.userShipping?.address}{" "}
                  </li>
                  <li>Pincode : {latestOrder?.userShipping?.pincode}</li>
                  <li>
                    Phone Number : {latestOrder?.userShipping?.phoneNumber}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="container text-center my-5"></div>
      </div>
    </>
  );
};

export default OrderConmfirmation;
