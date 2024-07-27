import React, { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Address = () => {
  const { shippingAddress, useraddress } = useContext(AppContext);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phnum, setPhnum] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !country ||
      !state ||
      !city ||
      !pincode ||
      !phnum ||
      !address
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    console.log({
      fullname: name,
      country: country,
      state: state,
      city: city,
      pincode: pincode,
      phoneNumber: phnum,
      address: address,
    });

    setAddress("");
    setName("");
    setCountry("");
    setState("");
    setPhnum("");
    setPincode("");
    setCity("");

    const result = await shippingAddress(
      name,
      address,
      city,
      state,
      country,
      pincode,
      phnum
    );
    console.log(result);
    if (result.data.success === true) {
      navigate("/checkout");
    }
  };

  return (
    <>
      <div
        className="container my-10"
        style={{
          margin: "auto",
          marginTop: "60px",
          border: "4px solid white",
          padding: "20px",
        }}
      >
        <h1>
          <center>Shipping Address</center>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                required
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                required
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="pincode" className="form-label">
                Pin Code
              </label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                required
                pattern="\d{6}" /* Assuming pincode should be a 6-digit number */
                onChange={(e) => setPincode(e.target.value)}
                value={pincode}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                required
                pattern="\d{10}" /* Assuming phone number should be a 10-digit number */
                onChange={(e) => setPhnum(e.target.value)}
                value={phnum}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address, Near-by
              </label>
              <textarea
                id="address"
                className="form-control"
                rows="3"
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></textarea>
            </div>
          </div>
          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary Register Here">
              Submit
            </button>
          </div>
        </form>
        {useraddress && (
          <div className="d-grid col-6 mx-auto my-3">
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              type="button"
              className="btn btn-warning Register Here my-3"
            >
              Use Old Address
            </button>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Address;
