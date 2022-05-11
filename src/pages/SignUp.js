import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./SignUp.css";

function SignUp() {
  const[signup, setSignUp] = useState({
    email: "",
    date: "",
    text: "",

  })

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header/>
          {/* Main Gradient Section Begins */}
          {/* ask Emily: 1. How to make this page scroll to allow space for form
          2. Ask about the responsiveness of the LogIn form
          3. Ask about hamburger and functionality */}
          <main className="h-100 d-flex flex-column justify-content-center align-items-center">
            <h3 class="h3 mt-4 p-3" > 
              <span className="text-white"> Sign Up </span>
            </h3>

            <div className="sign-up">
              <form>
                <div className="row mt-3 mb-3">
                  <div className="col h6">
                    <label for="firstname">First Name</label>
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      id="firstname" 
                      aria-label="firstname"
                      onChange={(event) => {
                        const value = event.target.value;
                        setSignUp({signup, firstname: value})
                      }}
                    />
                  </div>
                  <div className="col h6">
                    <label for="lastname"> Last Name</label>
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      id="lastname" 
                      aria-label="lastname"
                      onChange={(event) => {
                        const value = event.target.value;
                        setSignUp({signup,lastname:value})
                      }}
                    />
                  </div>
                </div>

                <div class="mb-3 h6">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control form-control-sm" id="username" aria-describedby="usernameHelp"/>
                </div>
                
                <div class="mb-3 h6">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp"/>
                </div>              

                <div className="row mt-3 mb-3">
                  <div className="col h6">
                    <label for="dob"> Date of Birth</label>
                    <input type="date" class="form-control form-control-sm" id="dob" aria-label="dob"/>
                  </div>
                  <div className="col h6">
                  <label for="country"> Country</label>
                    <select class="form-select form-select-sm" aria-label="Default select example">
                      <option selected>--select--</option>
                      <option value="1">United States of America</option>
                      <option value="2">Other</option>
                      {/* can use API for country */}
                    </select>
                  </div>
                </div>
                
                <div class="mb-3 h6">
                  <label for="password" class="form-label">Password</label>
                  <input type="text" class="form-control form-control-sm" id="password" aria-describedby="passwordHelp"/>
                </div>
                
                <div class="mb-3 h6">
                  <label for="confirmpassword" class="form-label">Confirm password</label>
                  <input type="text" class="form-control form-control-sm" id="confirmpassword" aria-describedby="confirmpasswordHelp"/>
                </div> 
                
                <div>
                  <button 
                    className="buttn"
                    type="submit" 
                    disabled= {!signup.email && !signup.password }
                    onClick={() => {{/*Where Backend goes*/}}}>
                    Sign Up
                  </button>
                </div>

              </form>
            </div>

          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
