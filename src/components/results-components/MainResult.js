import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../api/Store";
import "./MainResult.css";

function MainResult() {
  const [state, dispatch] = useContext(Context);
  const [title, setTitle] = useState("Title");
  const [plotOverview, setPlotOverview] = useState(null);
  const [poster, setPoster] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [networkNames, setNetworkNames] = useState(null);
  const [genreNames, setGenreNames] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(null);
  const [watchLink, setWatchLink] = useState(null);

  useEffect(() => {
    apiCall();
  }, []);

  // Update Network state (create platforms list)
  function updateNetwork(data) {
    const platformsArray = [];
    data.sources.map((platform) => {
      platformsArray.push(platform.name);
    });
    if (platformsArray.includes("Netflix")) {
      setNetworkNames("Netflix");
    } else if (platformsArray.includes("Disney+")) setNetworkNames("Disney+");
  }

  // Update Ttpe state (media type text details)
  function updateType(data) {
    if (data.type === "tv_series") {
      setType("TV Series");
    } else if (data.type === "movie") {
      setType("Film");
    }
  }

  // Update states with api data
  function updateStates(data) {
    setTitle(data.title);
    setPlotOverview(data.plot_overview);
    setPoster(data.backdrop);
    setImdbId(data.imdb_id);
    setGenreNames(data.genre_names.join(", "));
    setWatchLink(data.sources[0].web_url);
    setRating(data.us_rating);

    updateNetwork(data);
    updateType(data);
  }

  // Call api with user selections
  function apiCall() {
    const mainResultId = state.apiIds[0];
    const apiKey = "mVpqDEdeq8iq9gaLg6JuzYys8VRQUV6cHzLJmzDm";
    const apiUrl = `https://api.watchmode.com/v1/title/${mainResultId}/details/?apiKey=${apiKey}&append_to_response=sources`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        let data = json;
        updateStates(data);
      })
      .catch((err) => console.error(err));
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

  return (
    <section className="light-gradient">
      <h1 className="results-h1">
        Watch <span className="purple-text">{title}</span> on{" "}
        <span className="purple-text">{networkNames}</span>
      </h1>
      <h2>{state.apiSourceId}</h2>

      <div className="result-card-container">
        <div className="result-card">
          <div className="result-details">
            <a href={watchLink}>
              <h2 className="results-h2">{title}</h2>
            </a>
            <p className="plot-overview">{plotOverview}</p>
            <div className="result-links">
              <a href={watchLink}>Watch</a>
              <a href={`https://www.imdb.com/title/${imdbId}/`}>
                <i class="bi bi-info-circle"></i> More Info
              </a>
              <i class="bi bi-heart" onClick={handleHeartClick}></i>
            </div>
            <div className="search-filters">
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
