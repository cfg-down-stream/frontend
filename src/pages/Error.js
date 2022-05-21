import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/Store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Error.css";

function Error() {
  const [state, dispatch] = useContext(Context);
  const [networkNames, setNetworkNames] = useState(null);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="light-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            <i class="bi bi-emoji-frown"></i>
            <h1 className="error-page-message w-50 text-center">
              <span className="text-black">Sorry.</span> We couldn’t find any
              matches.
            </h1>
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Error;
