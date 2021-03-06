import { useState, useEffect, useContext } from "react";
import { Context } from "../../store/Store";

import "./Platform.css";
import Netflix from "../../assets/netflix-logo.png";
import Prime from "../../assets/prime-logo.png";
import Hulu from "../../assets/hulu-logo.png";
import Disney from "../../assets/disney-logo.png";
import Apple from "../../assets/apple-logo.png";
import HBO from "../../assets/hbo-logo.png";

function Platform(props) {
  /* SET STATES */
  const [name, setName] = useState("Stranger");
  const [platformSelection, setPlatformSelection] = useState(new Set());
  const [state, dispatch] = useContext(Context);

  /* HANDLE FILTER FUNCTION
  When clicked - remove greyscale, add purple border, change text colour to purple.
  When "unclicked" - do the reverse
*/
  function handleFilter(event) {
    if (event.currentTarget.classList[1] === "grayscale") {
      event.currentTarget.classList.remove("grayscale");
      event.currentTarget.classList.add("active");
    } else {
      event.currentTarget.classList.remove("active");
      event.currentTarget.classList.add("grayscale");
    }
  }

  /* HANDLE PLATFORM CLICK FUNCTION*/
  const handlePlatformClick = (value) => (event) => {
    // Add platform to platformSelection
    const platform = event.currentTarget.textContent.toLowerCase();
    platformSelection.add(platform);

    // Remove platform from platformSelection set if it is unclicked
    if (
      event.currentTarget.classList[1] === "active" &&
      platformSelection.size > 0
    ) {
      platformSelection.delete(value);
    }
    // console.log(platformSelection);

    // Push platformSelection set to the Search.js (parent) component through the parent's changePlatformChoice function
    props.changePlatformSelection(platformSelection);

    // Call handleFilter function
    handleFilter(event);
  };

  return (
    <section className="light-gradient">
      <h1 className="search-h1">
        Hello <span className="black-text">{state.name}</span>, where are you
        watching?{" "}
      </h1>
      <div className="platform-card-container">
        {/* Top Row */}
        <div className="platform-card-row">
          {/* Netflix Card */}
          <div
            className={"platform-card grayscale"}
            onClick={handlePlatformClick("netflix")}
            id="netflix-id"
          >
            <div className="platform-logo">
              <img src={Netflix} alt="Netflix logo" />
            </div>
            <div className="platform-card-title">
              <h4>Netflix</h4>
            </div>
          </div>
          {/* Prime Card */}
          <div
            className={"platform-card grayscale"}
            onClick={handlePlatformClick("prime video")}
          >
            <div className="platform-logo">
              <img src={Prime} alt="Prime Video logo" />
            </div>
            <div className="platform-card-title">
              <h4>Prime Video</h4>
            </div>
          </div>
          {/* Hulu Card */}
          <div
            className={"platform-card grayscale"}
            onClick={handlePlatformClick("hulu")}
          >
            <div className="platform-logo">
              <img src={Hulu} alt="Hulu logo" />
            </div>
            <div className="platform-card-title">
              <h4>Hulu</h4>
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="platform-card-row">
          {/* Disney Card */}
          <div
            className={"platform-card grayscale"}
            onClick={handlePlatformClick("disney plus")}
          >
            <div className="platform-logo">
              <img src={Disney} alt="Disney Pluslogo" />
            </div>
            <div className="platform-card-title">
              <h4>Disney Plus</h4>
            </div>
          </div>
          {/* Apple Card */}
          <div
            className={"platform-card grayscale"}
            onClick={handlePlatformClick("apple tv")}
          >
            <div className="platform-logo">
              <img src={Apple} alt="Apple TV logo" />
            </div>
            <div className="platform-card-title">
              <h4>Apple TV</h4>
            </div>
          </div>
          {/* HBO Card */}
          <div
            className={"platform-card grayscale"}
            onClick={handlePlatformClick("hbo max")}
          >
            <div className="platform-logo">
              <img src={HBO} alt="HBO Max logo" />
            </div>
            <div className="platform-card-title">
              <h4>HBO Max</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Platform;
