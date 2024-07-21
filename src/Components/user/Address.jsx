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
  const [pincode, setPincode] = useState();
  const [phnum, setPhnum] = useState();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (result.data.success == true) {
      navigate("/checkout");
    }
  };
  return (
    <>
      <div
        className="container my-10"
        style={{
          // width: "600px",
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
              <label htmlFor="exampleInputName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputName" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Pin Code
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setPincode(e.target.value)}
                value={pincode}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPhnum(e.target.value)}
                value={phnum}
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Address , Near-by
              </label>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
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
              type="submit"
              className="btn btn-warning Register Here my-3"
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
