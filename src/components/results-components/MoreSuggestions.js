import { useState } from "react";
import "./MoreSuggestions.css";
import Placeholder1 from "../../assets/suggestion-placeholder1.jpeg";
import Placeholder2 from "../../assets/suggestion-placeholder2.jpeg";
import Placeholder3 from "../../assets/suggestion-placeholder3.jpg";
import Placeholder4 from "../../assets/suggestion-placeholder4.jpg";

function MoreSuggestions() {
  const suggestionsObject = {
    one: {
      title: "You",
      image: Placeholder1,
      link: "https://www.google.com/",
    },
    two: {
      title: "Westworld",
      image: Placeholder2,
      link: "https://www.google.com/",
    },
    three: {
      title: "After Life",
      image: Placeholder3,
      link: "https://www.google.com/",
    },
    four: {
      title: "Succesion",
      image: Placeholder4,
      link: "https://www.google.com/",
    },
  };

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
    <section className="suggestions-section">
      <h3 className="results-h3">More From This Search</h3>
      {/* Suggestion One */}
      <div className="suggestions-container">
        {/* Suggestion One */}
        <div className="suggestion">
          <div className="suggestion-image-container">
            <a href={suggestionsObject.one.link}>
              {" "}
              <img
                className="suggestion-image"
                src={suggestionsObject.one.image}
                alt="/"
              />
            </a>
          </div>
          <a href="/">
            {" "}
            <h4 className="suggestion-h4 ">{suggestionsObject.one.title}</h4>
          </a>
          <i class="bi bi-heart" onClick={handleHeartClick}></i>
        </div>
        {/* Suggestion Two */}
        <div className="suggestion">
          <div className="suggestion-image-container">
            <a href={suggestionsObject.two.link}>
              {" "}
              <img
                className="suggestion-image"
                src={suggestionsObject.two.image}
                alt="/"
              />
            </a>
          </div>
          <a href="/">
            {" "}
            <h4 className="suggestion-h4 ">{suggestionsObject.two.title}</h4>
          </a>
          <i class="bi bi-heart" onClick={handleHeartClick}></i>
        </div>
        {/* Suggestion Three */}
        <div className="suggestion">
          <div className="suggestion-image-container">
            <a href={suggestionsObject.three.link}>
              {" "}
              <img
                className="suggestion-image"
                src={suggestionsObject.three.image}
                alt="/"
              />
            </a>
          </div>
          <a href="/">
            {" "}
            <h4 className="suggestion-h4 ">{suggestionsObject.three.title}</h4>
          </a>
          <i class="bi bi-heart" onClick={handleHeartClick}></i>
        </div>
        {/* Suggestion Four */}
        <div className="suggestion">
          <div className="suggestion-image-container">
            <a href={suggestionsObject.four.link}>
              {" "}
              <img
                className="suggestion-image"
                src={suggestionsObject.four.image}
                alt="/"
              />
            </a>
          </div>
          <a href="/">
            {" "}
            <h4 className="suggestion-h4 ">{suggestionsObject.four.title}</h4>
          </a>
          <i class="bi bi-heart" onClick={handleHeartClick}></i>
        </div>
      </div>
    </section>
  );
}

export default MoreSuggestions;
