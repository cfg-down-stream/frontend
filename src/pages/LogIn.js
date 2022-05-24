import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useContext } from "react";
import Axios, * as axios from "axios";
import { Context } from "../store/Store";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginError, setLoginError] = useState("");
  const navigator = useNavigate();
  const [state, dispatch] = useContext(Context);

  // sets up the connection with the backend
  const loginpage = () => {
    axios
      .post("http://localhost:3000/login", {
        email: email,
        password: password,
        //checks to see if there is a message from the backend, if so diplays it
      })
      .then((response) => {
        if (response.data.message) {
          setLoginError(response.data.message);
        } else {
          setLoginError(null);
          dispatch({
            type: "SET_USER_INFO",
            id: response.data[0].id,
            name: response.data[0].Name,
          });
          console.log(response.data[0]);
          navigator("/Search");
        }
      });
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="h-100 d-flex flex-column justify-content-center align-items-center">
            <h3 className="h3 mb-4">
              <span className="text-white"> Log In </span>
            </h3>

            <div className="div-form">
              {/* prevents the form from reloading each time*/}
              <form onSubmit={(event) => event.preventDefault()}>
                <div className="input-group-sm mb-3 ">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="col-form-label-m h6"
                  >
                    Email address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group-sm mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="col-form-label-m h6"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>

                <div id="emailHelp" className="h6">
                  <h6>{LoginError}</h6>
                </div>
                <div>
                  <button
                    className="log-btn"
                    type="submit"
                    disabled={!email || !password}
                    onClick={loginpage}
                  >
                    {" "}
                    Log In
                  </button>
                </div>
              </form>

              <div className="h6 mt-4">
                <span>New to downStream? </span>
                <span>
                  <Link to="/signup">Sign up</Link>
                </span>
              </div>
            </div>
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
