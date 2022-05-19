import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../api/Store";
import "./MoreSuggestions.css";

function MoreSuggestions() {
  const [state, dispatch] = useContext(Context);
  const [ready, setReady] = useState({ ready: false });
  const [suggestions, setSuggestions] = useState({
    one: {
      title: "title",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    two: {
      title: "title",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    three: {
      title: "title",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    four: {
      title: "title",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
  });

  // Call apiCall() on first render
  useEffect(() => {
    apiCall();
  }, []);

  function updateStates(dataArray) {
    setSuggestions({
      one: {
        title: dataArray[0].title,
        poster: dataArray[0].poster,
        watchLink: dataArray[0].sources[0].web_url,
        imdbId: dataArray[0].imdb_id,
      },
      two: {
        title: dataArray[1].title,
        poster: dataArray[1].poster,
        watchLink: dataArray[1].sources[0].web_url,
        imdbId: dataArray[1].imdb_id,
      },
      three: {
        title: dataArray[2].title,
        poster: dataArray[2].poster,
        watchLink: dataArray[2].sources[0].web_url,
        imdbId: dataArray[2].imdb_id,
      },
      four: {
        title: dataArray[3].title,
        poster: dataArray[3].poster,
        watchLink: dataArray[3].sources[0].web_url,
        imdbId: dataArray[3].imdb_id,
      },
    });
  }

  // Call api with 5 id numbers from the Search.js api call return
  async function apiCall() {
    const dataArray = [];
    state.apiIds.slice(1).map((id) => {
      const apiKey = "mVpqDEdeq8iq9gaLg6JuzYys8VRQUV6cHzLJmzDm";
      const apiUrl = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`;
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          let data = json;
          dataArray.push(data);
          return dataArray;
        })
        .then(function (dataArray) {
          updateStates(dataArray);
        })
        .catch((err) => console.error(err));
    });
  }

  function handleHeartClick(event) {
    if (event.currentTarget.classList[1] === "bi-heart") {
      event.currentTarget.classList.remove("bi-heart");
      event.currentTarget.classList.add("bi-heart-fill");
    } else {
      event.currentTarget.classList.remove("bi-heart-fill");
      event.currentTarget.classList.add("bi-heart");
    }

    //   saveToFavourites();
  }

  // if (ready.ready) {
  return (
    <section className="suggestions-section">
      <h3 className="results-h3">More From This Search</h3>
      {/* Suggestion One */}
      <div className="suggestions-container">
        {/* Suggestion One */}
        <div className="suggestion">
          <a href={suggestions.one.watchLink}>
            {" "}
            <h4 className="suggestion-h4 ">{suggestions.one.title}</h4>
          </a>
          <div className="suggestion-image-container">
            <a href={suggestions.one.watchLink}>
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
            <a href={`https://www.imdb.com/title/${suggestions.one.imdbId}`}>
              <i class="bi bi-info-circle"></i>
            </a>
            <i class="bi bi-heart" onClick={handleHeartClick}></i>
          </div>
        </div>
        {/* Suggestion Two */}
        <div className="suggestion">
          <a href={suggestions.two.watchLink}>
            {" "}
            <h4 className="suggestion-h4 ">{suggestions.two.title}</h4>
          </a>
          <div className="suggestion-image-container">
            <a href={suggestions.two.watchLink}>
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
            <a href={`https://www.imdb.com/title/${suggestions.one.imdbId}`}>
              <i class="bi bi-info-circle"></i>
            </a>
            <i class="bi bi-heart" onClick={handleHeartClick}></i>
          </div>
        </div>
        {/* Suggestion Three */}
        <div className="suggestion">
          <a href={suggestions.three.watchLink}>
            {" "}
            <h4 className="suggestion-h4 ">{suggestions.three.title}</h4>
          </a>
          <div className="suggestion-image-container">
            <a href={suggestions.three.watchLink}>
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
            <a href={`https://www.imdb.com/title/${suggestions.one.imdbId}`}>
              <i class="bi bi-info-circle"></i>
            </a>
            <i class="bi bi-heart" onClick={handleHeartClick}></i>
          </div>
        </div>
        {/* Suggestion Four */}
        <div className="suggestion">
          <a href={suggestions.four.watchLink}>
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
            <a href={`https://www.imdb.com/title/${suggestions.one.imdbId}`}>
              <i class="bi bi-info-circle"></i>
            </a>
            <i class="bi bi-heart" onClick={handleHeartClick}></i>
          </div>
        </div>
      </div>
    </section>
  );
  // } else {
  //   return (
  //     <section className="suggestions-section">
  //       <h3 className="results-h3">More From This Search</h3>
  //       Loader Here
  //     </section>
  //   );
  // }
}

export default MoreSuggestions;
