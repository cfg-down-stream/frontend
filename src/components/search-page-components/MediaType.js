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

  /* HANDLE FILTER FUNCTION
  When clicked - add purple border and change text to purple
  When "unclicked" - remove purple border and change text back
*/
  function handleFilter(event) {
    if (event.currentTarget.classList[0] === "default-border") {
      event.currentTarget.classList.remove("default-border");
      event.currentTarget.classList.add("active");
    } else {
      event.currentTarget.classList.remove("active");
      event.currentTarget.classList.add("default-border");
    }
  }

  /* HANDLE MEDIA CLICK FUNCTION */
  function handleMediaClick(event) {
    // Add media type to mediaSelection set
    const media = event.currentTarget.textContent.toLowerCase();
    mediaSelection.add(media);

    // Remove media type from mediaSelection set if it is unclicked
    if (
      event.currentTarget.classList[0] === "active" &&
      mediaSelection.size > 0
    ) {
      mediaSelection.delete(media);
    }
    console.log(mediaSelection);

    // Push mediaSelection set to the Search.js (parent) component through the parent's changePlatformChoice function
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
