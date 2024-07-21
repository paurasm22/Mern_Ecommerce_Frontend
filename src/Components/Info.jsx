import React from "react";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <h1 className="text-center my-4">Project Mern E Commerce </h1>
        <div className="container text-center">
          <h4>
            This is a project developed by Pauras More a student of Sies
            Graduate School of Technology (Third Year) of IT Department . Below
            is the stack used for the development of this project
          </h4>
          <h4 className="my-4">
            This is not the final build many bugs are yet to be fixed .{" "}
            <strong>
              Reload the page if faced errors related to data loading ..
            </strong>
          </h4>
        </div>

        <div className="container infocontainer ">
          <div className="frontend ">
            <h3>Front-End Technologies </h3>
            <ol>
              <li>Reactjs</li>
              <li>React Router Dom</li>
              <li>Bootstrap</li>
              <li>Axios</li>
            </ol>
          </div>
          <div className="backend">
            <h3>Back-End Technologies </h3>
            <ol>
              <li>Nodejs</li>
              <li>Expressjs</li>
              <li>MongoDB</li>
              <li>Mongoose</li>
            </ol>
          </div>
          <div className="additional">
            <h3>Additional Technologies </h3>
            <ol>
              <li>JWT (Json Web Token)</li>
              <li>Bcryptjs</li>
              <li>Dotenv</li>
            </ol>
          </div>
        </div>
        <h4 className="text-center my-4">My Socials </h4>
        <div
          className="container  my-4"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <h6>
            <ul>
              <li className="my-2">
                My LinkedIn :{" "}
                <a
                  href="https://www.linkedin.com/in/pauras-more-2206pm/"
                  target="_blank"
                >
                  Pauras More
                </a>
              </li>
              <li className="my-2">
                My Github :{" "}
                <a href="https://github.com/paurasm22" target="_blank">
                  paurasm22
                </a>
              </li>
              <li className="my-2">My Email : paurasmore22@gmail.com</li>
            </ul>
          </h6>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginBottom: "20px",
          }}
          className="btn btn-warning"
        >
          Back Home
        </button>
      </div>
    </>
  );
};

export default Info;
