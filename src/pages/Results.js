import React, { useState, useEffect, useContext } from "react";
import { Context } from "../api/Store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainResult from "../components/results-components/MainResult";
import MoreSuggestions from "../components/results-components/MoreSuggestions";
import "./Results.css";

// To Do
// 1. Return 5 random api search results
// 2. Take ids from 5 results and run another api call with them
// 3. Dispaly extra information from second api call

function Results() {
  const [state, dispatch] = useContext(Context);

  // Scroll to the top of this page when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="no-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            <MainResult />
            <MoreSuggestions />
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Results;
