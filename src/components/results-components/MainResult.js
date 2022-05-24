import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/Store";
import Axios, * as axios from "axios";
import "./MainResult.css";

function MainResult() {
  const [state, dispatch] = useContext(Context);
  const [title, setTitle] = useState("Title");
  const [titleId, setTitleId] = useState(null);
  const [plotOverview, setPlotOverview] = useState(null);
  const [poster, setPoster] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [networkNames, setNetworkNames] = useState(null);
  const [genreNames, setGenreNames] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(null);
  const [watchLink, setWatchLink] = useState(null);

  const platformIdsObject = {
    203: "Netflix",
    157: "Hulu",
    387: "HBO Max",
    372: "Disney+",
    371: "Apple TV+",
    26: "Amazon Prime",
  };

  useEffect(() => {
    apiCall();
  });

  /* UPDATE NETWORK NAMES FUNCTION
  1. For each id in the 1st item of the global apiSearchIds array state
  2. Find the platform name for the id in the platformIdsObject
  3. Return the platform name as an item in the platformsArray
  4. Join each item in the platformsArray separated by a comma
  */
  function updateNetwork(platformIdsObject) {
    const platformsArray = state.apiSearchIds[0].map((platform) => {
      return platformIdsObject[platform];
    });
    setNetworkNames(platformsArray.join(", "));
  }

  /* UPDATE WATCH LINK FUNCTION*/
  function updateWatchLink(data) {
    const webUrl = [];

    // For each data source in the api and for each networkName
    // If the data.source and networkName match, push the data sources web urls to the webUrl array
    for (let i = 0; i < data.sources.length; i++) {
      for (let j = 0; j < networkNames.length; j++) {
        if ((data.sources[i].name = networkNames[j])) {
          webUrl.push(data.sources[i].web_url);
        }
      }
    }

    // console.log("urls" + webUrl);
    // Set the watchLink at the first url in the webUrl array
    setWatchLink(webUrl[0]);
  }

  /* UPDATE TYPE FUNCTION
  1. Update type state */
  function updateType(data) {
    if (data.type === "tv_series") {
      setType("TV Series");
    } else if (data.type === "movie") {
      setType("Film");
    }
  }

  /* UPDATE STATES FUNCTION
  1. Update states with api data 
  2. Call updateWatchLink() and updateType() */
  function updateStates(data) {
    setTitle(data.title);
    setTitleId(data.id);
    setPlotOverview(data.plot_overview);
    setPoster(data.backdrop);
    setImdbId(data.imdb_id);
    setGenreNames(data.genre_names.join(", "));
    setRating(data.us_rating);
    // console.log("obj" + platformIdsObject);
    updateNetwork(platformIdsObject, data);
    updateWatchLink(data);
    updateType(data);
  }

  /* API CALL FUNCTION
  1. Take the 1st id from the global state "apiIds". apiIds contains fiveRandomTitleIds returned from the Search.js api call
  2. Add the 1st id to the api url and then fetch the data
  3. Once fetched, call updateStates()
   */
  function apiCall() {
    const mainResultId = state.apiIds[0];
    const apiKey = "zrVGwEWbj3fSgYJ0llyF8QZOAPbxLTXz1Dgiuj3a";
    const apiUrl = `https://api.watchmode.com/v1/title/${mainResultId}/details/?apiKey=${apiKey}&append_to_response=sources`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        let data = json;
        // console.log(data);
        updateStates(data);
      })
      .catch((err) => console.error(err));
  }

  /* SAVE TO FAVOURITES FUNCTION */
  function saveToFavourites(favTitleId) {
    // console.log(`Save ${favTitleId} to favourites`);

    axios
      .post("http://localhost:3000/results", {
        user_id: state.id,
        title_id: favTitleId,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* REMOVE FROM FAVOURITES FUNCTION */
  function removeFromFavourites(favTitleId) {
    // console.log(`Remove ${favTitleId} to favourites`);

    Axios.delete("http://localhost:3000/results", {
      body: {
        title_id: favTitleId,
        user_id: state.id,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* HANDLE HEART CLICK FUNCTION
  1. When clicked, send the current targets title_id to the saveToFavourites function
  2. When "unclicked" send the current targets title_id to the removeFromFavourites function r*/
  function handleHeartClick(event) {
    const favTitleId = event.currentTarget.id;
    if (event.currentTarget.classList[1] === "bi-heart") {
      event.currentTarget.classList.remove("bi-heart");
      event.currentTarget.classList.add("bi-heart-fill");
      saveToFavourites(favTitleId);
    } else {
      event.currentTarget.classList.remove("bi-heart-fill");
      event.currentTarget.classList.add("bi-heart");
      removeFromFavourites(favTitleId);
    }
  }

  return (
    <section className="light-gradient">
      <h1 className="results-h1">
        Watch <span className="purple-text">{title}</span> on{" "}
        <span className="purple-text">{networkNames}</span>
      </h1>
      <div className="result-card-container">
        <div className="result-card">
          <div className="result-details">
            <a href={watchLink} target="_blank" rel="noopener noreferrer">
              <h2 className="results-h2">{title}</h2>
            </a>

            <p className="plot-overview">{plotOverview}</p>
            <div className="result-links">
              <a href={watchLink} target="_blank" rel="noopener noreferrer">
                Watch
              </a>
              <a
                href={`https://www.imdb.com/title/${imdbId}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-info-circle"></i> More Info
              </a>
              <i
                className="bi bi-heart"
                id={titleId}
                onClick={handleHeartClick}
              ></i>
            </div>
            <div classNameName="search-filters">
              {networkNames} <span className="text-purple">&#8226;</span>{" "}
              {genreNames} <span className="text-purple">&#8226;</span> {type}{" "}
              <span className="text-purple">&#8226;</span> {rating}
            </div>
          </div>
          <div className="result-img-container">
            <img className="result-img" src={poster} alt="placeholder" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainResult;
