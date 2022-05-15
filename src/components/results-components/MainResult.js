import { useState } from "react";
import "./MainResult.css";
import Placeholder from "../../assets/result-placeholder.jpg";

function MainResult() {
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
        Watch <span className="purple-text">Show</span> on{" "}
        <span className="purple-text">Platform</span>
      </h1>
      <div className="result-card-container">
        <div className="result-card">
          <div className="result-details">
            <h2 className="results-h2">Show Title</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              magna sit tempus euismod etiam egestas sed quis. Tempor id turpis
              adipiscing eu lobortis in. Hendrerit vestibulum sollicitudin fusce
              id. Iaculis proin lorem viverra enim, sagittis.
            </p>
            <div className="result-links">
              <a href="/">Watch</a>
              <a href="/">
                <i class="bi bi-info-circle"></i> More Info
              </a>
              <i class="bi bi-heart" onClick={handleHeartClick}></i>
            </div>
            <div className="search-filters">
              Platforms | Genres | Media Type
            </div>
          </div>
          <div className="result-img-container">
            <img className="result-img" src={Placeholder} alt="placeholder" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainResult;
