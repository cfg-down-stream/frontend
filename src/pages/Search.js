import { useState, useEffect, useContext } from "react";
import { Context } from "../store/Store";
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
  const [searchIds, setSearchIds] = useState(null);
  const [state, dispatch] = useContext(Context);
  const navigator = useNavigate();

  /* USE EFFECT
  handleSubmitClick has to be called on the initial render to ensure the global states set when the user clicks
  */
  useEffect(() => {
    // console.log("Rendering");
    // If the two global states are not null (have been set in updateGlobalState function), goToeResultsPage()
    // Else call the handleSubmitClick function
    if (state.apiIds && state.apiSearchIds) {
      console.log(`Global states: ${state.apiIds} + ${state.apiSearchIds}`);
      goToResultsPage();
    } else {
      // handleSubmit will call on the first render, and then after the user clicks submit
      // If the global states aren't updated on the first user click, useEffect will call handleSubmitClick again
      handleSubmitClick();
    }
  }, [state]);

  /* GO TO RESULTS PAGE FUNCTION
   If the global states are not null, naviate to the results page
  */
  function goToResultsPage() {
    if (state.apiIds && state.apiSearchIds) {
      console.log("both states ready");
      navigator("/Results");
    }
  }

  /* UPDATE GLOBAL STATE FUNCTION
  1. Dispatch fiveTitleIds and searchIds to the global store
  */
  async function updateGlobalState(fiveRandomTitleIds) {
    await dispatch({ type: "SET_API_IDS_STATE", payload: fiveRandomTitleIds });
    await dispatch({ type: "SET_SEARCH_IDS_STATE", payload: searchIds });
  }

  /* API CALL FUNCTION
  1. Call api with user selections
  2. Return 5 random show/film ids
  3. Call the updateGlobalState function */
  function apiCall(sourceIds, genreIds, mediaIds) {
    const apiKey = "Ww17mP11SMc8LyR688gQNhi1HzAtTbZNH7jwSnQX";
    const apiUrl = `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&source_ids=${sourceIds}&types=${mediaIds}&genres=${genreIds}&page=1`;

    // Fetch api
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let data = json;
        return data;
      })
      .then((data) => {
        // If data object length is less than 4, go to error page
        if (Object.keys(data).length < 4) {
          // console.log(`Api Data Length: ${Object.keys(data).length}`);
          navigator("/Error");
        } else {
          // Else, push 5 random numbers to randomIndex array
          for (let i = 0; i < 5; i++) {
            randomIndex.push(Math.floor(Math.random() * 250));
          }

          // For each randomIndex, use it to find show/film ids in the api, then push to fiveRandomTitleIds
          const fiveRandomTitleIds = randomIndex.map((index) => {
            return data.titles[index].id;
          });
          return fiveRandomTitleIds;
        }
      })
      .then((fiveRandomTitleIds) => {
        updateGlobalState(fiveRandomTitleIds);
      })
      .catch((err) => console.error(err));
  }

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

  /* GATHER USER SELECTION DATA FUNCTION
   1. Gather users selections
   2. Get the id equivelent of each selection from the objects above
   3. Convert id array to string
   4. Call the apiCall function with the id strings as arguments
    */
  function gatherUserSelectionData() {
    // PLATFORM/SOURCE
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

    // Set the searchIds state with the Ids array, so that it can be made into a global state and used for some details in the Results page
    setSearchIds([sourceIdsArray, genreIdsArray, mediaIdsArray]);
    // console.log(`search id state: ${searchIds}`);

    apiCall(sourceIds, genreIds, mediaIds);
  }

  /* HANDLE SUBMIT CLICK FUNCTION */
  function handleSubmitClick() {
    const errorMessage = document.querySelector(".error-message");
    // If the user has chosen a platform, genre, and media -> call the gatherUserSelectionFunctions
    if (
      platformSelection.size > 0 &&
      genreSelection.size > 0 &&
      mediaSelection.size > 0
    ) {
      errorMessage.innerHTML = "";
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
          <main className="no-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            {/* Selection Section Begins */}
            <Platform
              changePlatformSelection={(choice) => setPlatformSelection(choice)}
            />
            <Genre
              changeGenreSelection={(choice) => setGenreSelection(choice)}
            />
            <MediaType
              changeMediaSelection={(choice) => setMediaSelection(choice)}
            />
            {/* Selection Section Ends */}
            {/* Button Section Begins */}
            <section className="submit-section light-gradient">
              <button
                onClick={handleSubmitClick}
                type="button"
                class="btn btn-primary"
              >
                Submit
              </button>
            </section>
            {/* Button Section Ends */}
            <p className="error-message"></p>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Search;
