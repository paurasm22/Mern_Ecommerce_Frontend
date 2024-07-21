import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";

const Profile = () => {
  const { userDetails } = useContext(AppContext);

  return (
    <>
      <div className="container text-center my-3">
        <h1>User Details</h1>
        <h3>{`User Name : ${userDetails?.name}`}</h3>
        <h3>{`User Email address : ${userDetails?.email}`}</h3>
      </div>
    </>
  );
};

export default Profile;
