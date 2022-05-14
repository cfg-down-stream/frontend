import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Search.css";
import Platform from "../components/search-page-components/Platform";
import Genre from "../components/search-page-components/Genre";
import MediaType from "../components/search-page-components/MediaType";
import ContentRating from "../components/search-page-components/ContentRating";

function Search() {
  const [platformSelection, setPlatformSelection] = useState([]);
  const [genreSelection, setGenreSelection] = useState([]);
  const [mediaSelection, setMediaSelection] = useState([]);
  const [ratingSelection, setRatingSelection] = useState([]);
  const [randomIndex, setrandomIndex] = useState([]);

  // Ids relating to the API data
  const apiPlatformIds = {
    netflix: 203,
    hulu: 157,
    "hbo max": 387,
    "disney plus": 372,
    "apple tv": 371,
    "prime video": 26,
  };

  const apiMediaIds = {
    series: "tv_series",
    film: "movie",
  };

  const apiGenreIds = {
    action: 1,
    // "action and adventure": 39,
    adventure: 2,
    animation: 3,
    anime: 33,
    comedy: 4,
    crime: 5,
    documentary: 6,
    drama: 7,
    family: 8,
    fantasy: 9,
    horror: 11,
    kids: 21,
    music: 12,
    musical: 32,
    mystery: 13,
    nature: 36,
    reality: 23,
    romance: 14,
    "sci-fi & fantasy": 40,
    thriller: 17,
    any: "1,2,3,33,4,5,6,7,8,9,11,21,12,32,13,36,23,14,40,17",
  };

  function getFiveRandomWatchIds(data) {
    for (let i = 0; i < 5; i++) {
      randomIndex.push(Math.floor(Math.random() * 250));
      // console.log(randomIndex);
    }
    // Log the watchmode ids of the 5 random shows. This will be used to run another api call on a different url, to recieve more detailed data.
    const firstResult = data.titles[randomIndex[0]];
    const secondResult = data.titles[randomIndex[1]];
    const thirdResult = data.titles[randomIndex[2]];
    const fourthResult = data.titles[randomIndex[3]];
    const fifthResult = data.titles[randomIndex[4]];
    console.log(
      firstResult,
      secondResult,
      thirdResult,
      fourthResult,
      fifthResult
    );
  }

  function apiCall(sourceIds, genreIds, mediaIds) {
    console.log(sourceIds, genreIds, mediaIds);
    const apiKey = "zrVGwEWbj3fSgYJ0llyF8QZOAPbxLTXz1Dgiuj3a";
    const apiUrl = `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&source_ids=${sourceIds}&types=${mediaIds}&genres=${genreIds}&page=1`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        let data = json;
        console.log(data);
        getFiveRandomWatchIds(data);
      })
      .catch((err) => console.error(err));
  }

  // Takes the users platform,genre and media selections and converts them to their api id equivelent
  // Then converts the array to a string that can be inserted into the api url.
  function gatherData() {
    // PLATFORM
    // Create new array for source ids
    const sourceIdsArray = [];
    //  Create new array from platformSelection set
    const platformSelectionArray = Array.from(platformSelection);
    // For each platform in the platformSelectionArray, push the paltform id from the apiPlatformIds object into the sourceIdsArray
    platformSelectionArray.forEach((platform) => {
      sourceIdsArray.push(apiPlatformIds[platform]);
    });
    // Convert sourceIds array to string
    const sourceIds = sourceIdsArray.toString();

    // GENRE
    const genreIdsArray = [];
    const genreSelectionArray = Array.from(genreSelection);
    genreSelectionArray.forEach((genre) => {
      genreIdsArray.push(apiGenreIds[genre]);
    });
    const genreIds = genreIdsArray.toString();

    // MEDIA
    const mediaIdsArray = [];
    const mediaSelectionArray = Array.from(mediaSelection);
    mediaSelectionArray.forEach((media) => {
      mediaIdsArray.push(apiMediaIds[media]);
    });
    const mediaIds = mediaIdsArray.toString();

    // Call api function, passing string variables
    apiCall(sourceIds, genreIds, mediaIds);
  }

  function handleSubmitClick() {
    const errorMessage = document.querySelector(".error-message");

    if (
      platformSelection.size > 0 &&
      genreSelection.size > 0 &&
      mediaSelection.size > 0
    ) {
      errorMessage.innerHTML = "";
      gatherData();
    } else {
      errorMessage.innerHTML =
        "Please pick your platform, genre and show type.";
    }
  }

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="no-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            <Platform
              changePlatformSelection={(choice) => setPlatformSelection(choice)}
            />
            <Genre
              changeGenreSelection={(choice) => setGenreSelection(choice)}
            />
            <MediaType
              changeMediaSelection={(choice) => setMediaSelection(choice)}
            />
            <ContentRating
              changeRatingSelection={(choice) => setRatingSelection(choice)}
            />
            {/* Creates api url and goes to results page */}
            <section className="submit-section light-gradient">
              {/* <Link to="/results"> */}
              <button
                onClick={handleSubmitClick}
                type="button"
                class="btn btn-primary"
              >
                Submit
              </button>
              {/* </Link> */}
            </section>
            <p className="error-message"></p>
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Search;
