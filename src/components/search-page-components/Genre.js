import { useState } from "react";

function Genre(props) {
  const [genreSelection, setGenreSelection] = useState(new Set());

  const genreList = [
    "Action",
    "Adventure",
    "Animation",
    "Anime",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Horror",
    "Kids",
    "Music",
    "Musical",
    "Mystery",
    "Nature",
    "Reality",
    "Romance",
    "Sci-fi & Fantasy",
    "Thriller",
    "Any",
  ];

  // Create list elements out of the genreList array
  const listItems = genreList.map((genre, index) => (
    <li onClick={handleGenreClick} key={index} className="default-border">
      {genre}
    </li>
  ));

  /* HANDLE FILTER FUNCTION
  When clicked - add purple border and change text to purple
  When "unclicked" - remove purple border and change text back
*/ function handleFilter(event) {
    if (event.currentTarget.classList[0] === "default-border") {
      event.currentTarget.classList.remove("default-border");
      event.currentTarget.classList.add("active");
    } else {
      event.currentTarget.classList.remove("active");
      event.currentTarget.classList.add("default-border");
    }
  }

  /* HANDLE MEDIA CLICK FUNCTION */
  function handleGenreClick(event) {
    // Add genre to genreSelection set
    const genre = event.currentTarget.textContent.toLowerCase();
    genreSelection.add(genre);

    // Remove genre from genreSelection set if it is unclicked
    if (
      event.currentTarget.classList[0] === "active" &&
      genreSelection.size > 0
    ) {
      genreSelection.delete(genre);
    }
    console.log(genreSelection);

    // Push genreSelection set to the Search.js (parent) component through the parent's changePlatformChoice function
    props.changeGenreSelection(genreSelection);
    handleFilter(event);
  }

  return (
    <section className="light-gradient">
      <h1 className="search-h1">Genre?</h1>
      <ul className="genre-button-container">{listItems}</ul>
    </section>
  );
}

export default Genre;
