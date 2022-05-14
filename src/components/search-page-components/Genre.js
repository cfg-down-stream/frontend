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

  // Add purple border and text colour to clicked list item
  function handleFilter(event) {
    if (event.currentTarget.classList[0] === "default-border") {
      event.currentTarget.classList.remove("default-border");
      event.currentTarget.classList.add("active");
    } else {
      event.currentTarget.classList.remove("active");
      event.currentTarget.classList.add("default-border");
    }
  }

  // Add genre to the selection set, call handleFilter(), and push set to Search.js component
  function handleGenreClick(event) {
    const genre = event.currentTarget.textContent.toLowerCase();
    genreSelection.add(genre);
    // Remove genre item from set if it is unselected
    if (
      event.currentTarget.classList[0] === "active" &&
      genreSelection.size > 0
    ) {
      genreSelection.delete(genre);
    }
    console.log(genreSelection);

    // Push genreSelection set to Search component
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
