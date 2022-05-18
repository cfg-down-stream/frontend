import { Link } from "react-router-dom";
import "./LogIn.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import Axios, * as axios from "axios";

function LogIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // sets up the connection with the backend
  const loginpage = () => {
    console.log("logging in")
    axios.post("http://localhost:3000/login", {
     email: email,
     password: password,
    }).then ((response) => {
      console.log (response.data);
    });
    
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
        <main className="h-100 d-flex flex-column justify-content-center align-items-center">
          <h3 className="h3 mb-4" > 
            <span className="text-white"> Log In </span>
          </h3> 
          
          <div className="div-form">
          {/* prevents the form from reloading each time*/}
          <form onSubmit={(event) => event.preventDefault()}>
              <div className="input-group-sm mb-3 ">
                <label
                  for="exampleInputEmail1"
                  className="col-form-label-m h6"
                >
                Email address
                </label>

                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={(event) => {
                   setEmail(event.target.value)
                  }}
                />
                <div id="emailHelp" className="form-text">
                  Error message text
                </div>
              </div>

              <div className="input-group-sm mb-4">
                <label
                  for="exampleInputPassword1"
                  className="col-form-label-m h6"
                >
                Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
              </div>

              <div>
              <button type="submit" onClick={loginpage}> Log In</button>

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
