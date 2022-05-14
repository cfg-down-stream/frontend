import { useState } from "react";

function MediaType(props) {
  const [mediaSelection, setMediaSelection] = useState(new Set());

  const mediaList = ["Series", "Film"];

  // Create list elements out of the mediaList array
  const mediaListItems = mediaList.map((type, index) => (
    <li onClick={handleMediaClick} key={index} className="default-border">
      {type}
    </li>
  ));

  // Add purple border to clicked list item
  function handleFilter(event) {
    if (event.currentTarget.classList[0] === "default-border") {
      event.currentTarget.classList.remove("default-border");
      event.currentTarget.classList.add("active");
    } else {
      event.currentTarget.classList.remove("active");
      event.currentTarget.classList.add("default-border");
    }
  }

  // Add media type to array, push to Search component, and call handleFilter(),
  function handleMediaClick(event) {
    const media = event.currentTarget.textContent.toLowerCase();
    mediaSelection.add(media);
    // Remove media item from  set if it is unselected
    if (
      event.currentTarget.classList[0] === "active" &&
      mediaSelection.size > 0
    ) {
      mediaSelection.delete(media);
    }
    console.log(mediaSelection);

    // Push genreSelection set to Search component
    props.changeMediaSelection(mediaSelection);
    handleFilter(event);
  }

  return (
    <section className="light-gradient">
      <h1 className="search-h1">Series or Film?</h1>
      <ul className="genre-button-container">{mediaListItems}</ul>
    </section>
  );
}

export default MediaType;
