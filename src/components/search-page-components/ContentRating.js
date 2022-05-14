import { useState } from "react";

function ContentRating(props) {
  const [ratingSelection, setRatingSelection] = useState(new Set());

  const ratingList = ["Family", "PG-13", "18+", "Any"];

  const ratingListItems = ratingList.map((rating, index) => (
    <li onClick={handleRatingClick} key={index} className="default-border">
      {rating}
    </li>
  ));

  function handleFilter(event) {
    if (event.currentTarget.classList[0] === "default-border") {
      event.currentTarget.classList.remove("default-border");
      event.currentTarget.classList.add("active");
    } else {
      event.currentTarget.classList.remove("active");
      event.currentTarget.classList.add("default-border");
    }
  }

  function handleRatingClick(event) {
    const rating = event.currentTarget.textContent.toLowerCase();
    ratingSelection.add(rating);
    // Remove genre item from set if it is unselected
    if (
      event.currentTarget.classList[0] === "active" &&
      ratingSelection.size > 0
    ) {
      ratingSelection.delete(rating);
    }
    console.log(ratingSelection);

    // Push genreSelection set to Search component
    props.changeRatingSelection(ratingSelection);
    handleFilter(event);
  }

  return (
    <section className="light-gradient">
      <h1 className="search-h1">Content Rating?</h1>
      <ul className="genre-button-container">{ratingListItems}</ul>
    </section>
  );
}

export default ContentRating;
