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
  const [randomIndex, setrandomIndex] = useState([]);

  const [state, dispatch] = useContext(Context);
  let theState = state.apiResultsArray;

  // function getFiveRandomWatchIds(data) {
  //   for (let i = 0; i < 5; i++) {
  //     randomIndex.push(Math.floor(Math.random() * 250));
  //     // console.log(randomIndex);
  //   }
  //   // Log the watchmode ids of the 5 random shows. This will be used to run another api call on a different url, to recieve more detailed data.
  //   const fiveIds = [
  //     data.titles[randomIndex[0]].id,
  //     data.titles[randomIndex[1]].id,
  //     data.titles[randomIndex[2]].id,
  //     data.titles[randomIndex[3]].id,
  //     data.titles[randomIndex[4]].id,
  //   ];

  //   // console.log(fiveIds);
  //   dispatch({ type: "SET_API_STATE", payload: fiveIds });
  //   console.log(state.apiResultsArray);
  //   // window.location.href = "./Results";
  // }

  // function apiCall(sourceIds, genreIds, mediaIds) {
  //   console.log(sourceIds, genreIds, mediaIds);
  //   const apiKey = "zrVGwEWbj3fSgYJ0llyF8QZOAPbxLTXz1Dgiuj3a";
  //   const apiUrl = `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&source_ids=${sourceIds}&types=${mediaIds}&genres=${genreIds}&page=1`;

  //   fetch(apiUrl)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (json) {
  //       let data = json;
  //       console.log(data);
  //       getFiveRandomWatchIds(data);
  //     })
  //     .catch((err) => console.error(err));
  // }

  // Call api function, passing string variables
  // apiCall(sourceIds, genreIds, mediaIds);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="no-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            <h1>{theState}</h1>

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
