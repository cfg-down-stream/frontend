import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/Store";
import Axios, * as axios from "axios";
import "./MoreSuggestions.css";

function MoreSuggestions() {
  const [state, dispatch] = useContext(Context);
  const [userId, setUserId] = useState(1);
  const [suggestions, setSuggestions] = useState({
    one: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    two: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    three: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    four: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
  });

  // Call apiCall() on first render
  useEffect(() => {
    apiCall();
  }, []);

  /* UPDATE STATES FUNCTION
  1. Set the suggestions state using details from the data.
  2. Four nested objects, for the 4 different suggestions that will dispaly on the page
   */
  function updateStates(dataArray) {
    setSuggestions({
      one: {
        title: dataArray[0].title,
        id: dataArray[0].id,
        poster: dataArray[0].poster,
        watchLink: dataArray[0].sources[0].web_url,
        imdbId: dataArray[0].imdb_id,
      },
      two: {
        title: dataArray[1].title,
        id: dataArray[1].id,
        poster: dataArray[1].poster,
        watchLink: dataArray[1].sources[0].web_url,
        imdbId: dataArray[1].imdb_id,
      },
      three: {
        title: dataArray[2].title,
        id: dataArray[2].id,
        poster: dataArray[2].poster,
        watchLink: dataArray[2].sources[0].web_url,
        imdbId: dataArray[2].imdb_id,
      },
      four: {
        title: dataArray[3].title,
        id: dataArray[3].id,
        poster: dataArray[3].poster,
        watchLink: dataArray[3].sources[0].web_url,
        imdbId: dataArray[3].imdb_id,
      },
    });
  }

  /* API CALL FUNCTION
  1. Take the apiIds state from the global store, which contains fiveRandomTitleIds returned from the Search.js api call
  2. Make another api call with the ids
   */
  async function apiCall() {
    const dataArray = [];
    // Slice the apiIds array to start at index 1. For each apiId fetch from the api
    state.apiIds.slice(1).map((id) => {
      const apiKey = "zrVGwEWbj3fSgYJ0llyF8QZOAPbxLTXz1Dgiuj3a";
      const apiUrl = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`;
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          let data = json;
          // Push each of the 4 api data to an array
          dataArray.push(data);
          return dataArray;
        })
        .then(function (dataArray) {
          // Call the updateStates function with the dataArray as an argument
          updateStates(dataArray);
        })
        .catch((err) => console.error(err));
    });
  }

  /* SAVE TO FAVOURITES FUNCTION */
  function saveToFavourites(favTitleId) {
    console.log(`Save ${favTitleId} to favourites`);
    axios
      .post("http://localhost:3000/results", {
        user_id: userId,
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
    console.log(`Remove ${favTitleId} to favourites`);
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
    <section className="suggestions-section">
      <h3 className="results-h3">More From This Search</h3>
      <div className="suggestions-container">
        {/* Suggestion One Begins*/}
        <div className="suggestion">
          <a
            href={suggestions.one.watchLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <h4 className="suggestion-h4 ">{suggestions.one.title}</h4>
          </a>
          <div className="suggestion-image-container">
            <a
              href={suggestions.one.watchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                className="suggestion-image"
                src={suggestions.one.poster}
                alt={`${suggestions.one.title} poster`}
              />
            </a>
          </div>

          <div className="suggestion-links">
            {" "}
            <a
              href={`https://www.imdb.com/title/${suggestions.one.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-info-circle"></i>
            </a>
            <i
              className={`bi bi-heart`}
              id={suggestions.one.id}
              onClick={handleHeartClick}
            ></i>
          </div>
        </div>
        {/* Suggestion One Ends*/}
        {/* Suggestion Two Begins */}
        <div className="suggestion">
          <a
            href={suggestions.two.watchLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <h4 className="suggestion-h4 ">{suggestions.two.title}</h4>
          </a>
          <div className="suggestion-image-container">
            <a
              href={suggestions.two.watchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                className="suggestion-image"
                src={suggestions.two.poster}
                alt={`${suggestions.two.title} poster`}
              />
            </a>
          </div>

          <div className="suggestion-links">
            {" "}
            <a
              href={`https://www.imdb.com/title/${suggestions.two.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-info-circle"></i>
            </a>
            <i
              className="bi bi-heart"
              id={suggestions.one.id}
              onClick={handleHeartClick}
            ></i>
          </div>
        </div>
        {/* Suggestion TwoEnds*/}
        {/* Suggestion Three Begins */}
        <div className="suggestion">
          <a
            href={suggestions.three.watchLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <h4 className="suggestion-h4 ">{suggestions.three.title}</h4>
          </a>
          <div className="suggestion-image-container">
            <a
              href={suggestions.three.watchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                className="suggestion-image"
                src={suggestions.three.poster}
                alt={`${suggestions.three.title} poster`}
              />
            </a>
          </div>

          <div className="suggestion-links">
            {" "}
            <a
              href={`https://www.imdb.com/title/${suggestions.three.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-info-circle"></i>
            </a>
            <i
              className="bi bi-heart"
              id={suggestions.three.id}
              onClick={handleHeartClick}
            ></i>
          </div>
        </div>
        {/* Suggestion Three Ends*/}
        {/* Suggestion Four  Begins */}
        <div className="suggestion">
          <a
            href={suggestions.four.watchLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <h4 className="suggestion-h4 ">{suggestions.four.title}</h4>
          </a>
          <div className="suggestion-image-container">
            <a href={suggestions.four.watchLink}>
              {" "}
              <img
                className="suggestion-image"
                src={suggestions.four.poster}
                alt={`${suggestions.four.title} poster`}
              />
            </a>
          </div>
          <div className="suggestion-links">
            {" "}
            <a
              href={`https://www.imdb.com/title/${suggestions.four.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-info-circle"></i>
            </a>
            <i
              className="bi bi-heart"
              id={suggestions.four.id}
              onClick={handleHeartClick}
            ></i>
          </div>
        </div>
        {/* Suggestion FOUR Ends*/}
      </div>
    </section>
  );
}

export default MoreSuggestions;
