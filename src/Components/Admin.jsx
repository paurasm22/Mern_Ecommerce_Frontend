import React, { useState } from "react";
import Addproducts from "./product/Addproducts";
import Allusers from "./Allusers";
import Allorders from "./Allorders";

const Admin = () => {
  const [selected, setSelected] = useState(<Addproducts />);
  return (
    <div>
      <>
        <div
          className="adminopts"
          style={{
            backgroundColor: "purple",
            height: "40px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
          }}
        >
          <div
            className="products"
            onClick={() => {
              setSelected(<Addproducts />);
            }}
            style={{ marginLeft: "20px" }}
          >
            Add Products
          </div>
          <div
            onClick={() => {
              setSelected(<Allusers />);
            }}
            className="allusers"
          >
            See all users
          </div>
          <div
            onClick={() => {
              setSelected(<Allorders />);
            }}
            className="allusers"
          >
            See All Orders
          </div>
        </div>
        {selected}
      </>
    </div>
  );
};

export default Admin;
