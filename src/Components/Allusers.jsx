import React, { useContext } from "react";
import AppContext from "../Context/AppContext";

const Allusers = () => {
  const { allUsers } = useContext(AppContext);

  return (
    <div
      className="cont"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center" /* Center items horizontally */,
        margin: "auto",
        padding: "20px",
      }}
    >
      <h1 className="text-center" style={{ color: "#fff" }}>
        Total Users: {allUsers.length}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center" /* Center items horizontally */,
          width: "100%",
          maxWidth: "800px" /* Optional: limit max width */,
        }}
      >
        {allUsers.map((user) => (
          <div
            key={user._id} /* Added key prop for list rendering */
            className="my-4"
            style={{
              background: "#383333",
              width: "100%",
              maxWidth: "600px" /* Optional: limit max width for each card */,
              padding: "20px",
              border: "2px white solid",
              borderRadius: "20px",
              color: "#fff" /* Text color inside cards */,
              marginBottom: "10px" /* Space between cards */,
            }}
          >
            <div>User Id: {user._id}</div>
            <div>User Name: {user.name}</div>
            <div>User Email: {user.email}</div>
            <div>Password: {user.password}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allusers;
