import React, { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const { register } = useContext(AppContext);
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name: name, password: passwd, email: email });
    // console.log(email);
    // console.log(passwd);
    const result = await register(name, email, passwd);
    // alert("Form has been Submitted !  ");
    setEmail("");
    setName("");
    setPasswd("");
    if (result.sucess === true) {
      navigate("/login");
    }
  };
  return (
    <>
      <div
        className="container my-10"
        style={{
          width: "600px",
          margin: "auto",
          marginTop: "60px",
          border: "4px solid white",
          padding: "20px",
        }}
      >
        <h1>
          <center>Register Here</center>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Enter Name
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
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPasswd(e.target.value)}
              value={passwd}
            />
          </div>
          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary Register Here">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
