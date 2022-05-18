import { useState, useEffect, useContext } from "react";
import { Context } from "../api/Store";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Search.css";
import Platform from "../components/search-page-components/Platform";
import Genre from "../components/search-page-components/Genre";
import MediaType from "../components/search-page-components/MediaType";

function Search() {
  const [platformSelection, setPlatformSelection] = useState([]);
  const [genreSelection, setGenreSelection] = useState([]);
  const [mediaSelection, setMediaSelection] = useState([]);
  const [randomIndex, setRandomIndex] = useState([]);
  const [state, dispatch] = useContext(Context);
  const navigator = useNavigate();

  // Ids relating to the API data
  const platformIdsObject = {
    netflix: 203,
    hulu: 157,
    "hbo max": 387,
    "disney plus": 372,
    "apple tv": 371,
    "prime video": 26,
  };

  const mediaIdsObject = {
    series: "tv_series",
    film: "movie",
  };

  const genreIdsObject = {
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

  // If the apiData is not null, naviate to the results pagge
  function goToResultsPage() {
    if (state.apiIds) {
      navigator("/Results");
    }
  }

  // Log the global state on every render and call the goToResultsPage
  useEffect(() => {
    console.log("Rendering");
    goToResultsPage();
  }, [state]);

  // Updte date the global state in the Store
  function updateGlobalState(fiveRandomTitleIds) {
    dispatch({ type: "SET_API_STATE", payload: fiveRandomTitleIds });
  }

  // Call api with user selections
  function apiCall(sourceIds, genreIds, mediaIds) {
    const apiKey = "zrVGwEWbj3fSgYJ0llyF8QZOAPbxLTXz1Dgiuj3a";
    const apiUrl = `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&source_ids=${sourceIds}&types=${mediaIds}&genres=${genreIds}&page=1`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        let data = json;
        return data;
      })
      .then(function (data) {
        // Push 5 random numbers to randomIndex array
        for (let i = 0; i < 5; i++) {
          randomIndex.push(Math.floor(Math.random() * 250));
        }
        // Use the 5 random numbers in the randomIndex array, to return 5 ids from the api results
        const fiveRandomTitleIds = [
          data.titles[randomIndex[0]].id,
          data.titles[randomIndex[1]].id,
          data.titles[randomIndex[2]].id,
          data.titles[randomIndex[3]].id,
          data.titles[randomIndex[4]].id,
        ];
        return fiveRandomTitleIds;
      })
      .then(function (fiveRandomTitleIds) {
        updateGlobalState(fiveRandomTitleIds);
      })
      .catch((err) => console.error(err));
  }

  // Gather users filter selections
  function gatherUserSelectionData() {
    // PLATFORM
    const sourceIdsArray = [];
    const platformSelectionArray = Array.from(platformSelection);
    platformSelectionArray.forEach((platform) => {
      sourceIdsArray.push(platformIdsObject[platform]);
    });
    const sourceIds = sourceIdsArray.toString();

    // GENRE
    const genreIdsArray = [];
    const genreSelectionArray = Array.from(genreSelection);
    genreSelectionArray.forEach((genre) => {
      genreIdsArray.push(genreIdsObject[genre]);
    });
    const genreIds = genreIdsArray.toString();

    // MEDIA
    const mediaIdsArray = [];
    const mediaSelectionArray = Array.from(mediaSelection);
    mediaSelectionArray.forEach((media) => {
      mediaIdsArray.push(mediaIdsObject[media]);
    });
    const mediaIds = mediaIdsArray.toString();

    // Call api function, passing string variables
    apiCall(sourceIds, genreIds, mediaIds);
  }

  // Handle submit click
  function handleSubmitClick() {
    const errorMessage = document.querySelector(".error-message");
    if (
      platformSelection.size > 0 &&
      genreSelection.size > 0 &&
      mediaSelection.size > 0
    ) {
      errorMessage.innerHTML = "";
      // Call gatherData function
      gatherUserSelectionData();
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
