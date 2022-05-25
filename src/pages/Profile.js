import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profile.css";
import React, { useEffect, useState, useContext } from "react";
import Axios, * as axios from "axios";
import { Context } from "../store/Store";

function Profile() {
  //create empty array for returning the name of the user and favourites
  const [profileName, setProfileName] = useState("");
  // const [titleIds, setTitleIds] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [titleInfo, setTitleInfo] = useState({
    one: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    two: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    three: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "id",
    },
    four: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "title",
    },
  });

  //get request to API end point in the backend, send data to handleResponse func
  useEffect(() => {
    Axios.get(`http://localhost:3000/profile/${state.id}`).then((response) => {
      console.log(response.data);
      const data = response.data;
      handleResponse(data);
    });
  }, []);

  // Add data from GET api to array
  function handleResponse(data) {
    const titleIds = data.map((row) => {
      return row.Title_id;
    });

    // console.log(titleIds);
    apiCall(titleIds);
  }

  // Set states
  function updateStates(dataArray) {
    setTitleInfo({
      one: {
        title: dataArray[0].title,
        id: dataArray[0].id,
        poster: dataArray[0].poster,
        watchLink: dataArray[0].sources[0].web_url,
        imdbId: dataArray[0].imdb_id,
      },
      two: {
        title: dataArray[1].title,
        id: dataArray[1].id,
        poster: dataArray[1].poster,
        watchLink: dataArray[1].sources[0].web_url,
        imdbId: dataArray[1].imdb_id,
      },
      three: {
        title: dataArray[2].title,
        id: dataArray[2].id,
        poster: dataArray[2].poster,
        watchLink: dataArray[2].sources[0].web_url,
        imdbId: dataArray[2].imdb_id,
      },
      four: {
        title: dataArray[3].title,
        id: dataArray[3].id,
        poster: dataArray[3].poster,
        watchLink: dataArray[3].sources[0].web_url,
        imdbId: dataArray[3].imdb_id,
      },
    });
  }

  function apiCall(titleIds) {
    const dataArray = [];
    titleIds.map((id) => {
      const apiKey = "4uTFtZkPiGJiwKzKvSPuq1mYNaw1uezYdJugodcM";
      const apiUrl = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`;
      fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          let data = json;
          dataArray.push(data);
          return dataArray;
        })
        .then(function (dataArray) {
          // Call the updateStates function with the dataArray as an argument
          console.log(dataArray);
          updateStates(dataArray);
        })
        .catch((err) => console.error(err));
    });
  }

  function saveToFavourites(favTitleId) {
    console.log(`Save ${favTitleId} to favourites`);
  }

  function removeFromFavourites(favTitleId) {
    console.log(`Remove ${favTitleId} to favourites`);
  }

  function handleHeartClick(event) {
    const favTitleId = event.currentTarget.id;
    if (event.currentTarget.classList[1] === "bi-heart-fill") {
      event.currentTarget.classList.remove("bi-heart-fill");
      event.currentTarget.classList.add("bi-heart");
      removeFromFavourites(favTitleId);
    } else {
      event.currentTarget.classList.remove("bi-heart");
      event.currentTarget.classList.add("bi-heart-fill");
      saveToFavourites(favTitleId);
    }
  }

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="light-gradient  h-100 d-flex flex-column justify-content-center align-items-center">
            {/* Favourites Section Begins */}
            <section className="favourite-section">
              <h1 className="favourite-h2">
                {state.name}'s
                <span className="text-blue"> Favourites </span>
              </h1>
              <div className="favourite-container">
                {/* Favourite One Begins*/}
                <div className="favourite">
                  <a
                    href={titleInfo.one.watchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <h4 className="suggestion-h4 ">{titleInfo.one.title}</h4>
                  </a>
                  <div className="suggestion-image-container">
                    <a
                      href={titleInfo.one.watchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <img
                        className="suggestion-image"
                        src={titleInfo.one.poster}
                        alt={`${titleInfo.one.title} poster`}
                      />
                    </a>
                  </div>

                  <div className="suggestion-links">
                    {" "}
                    <a
                      href={`https://www.imdb.com/title/${titleInfo.one.imdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-info-circle"></i>
                    </a>
                    <i
                      className={`bi bi-heart-fill`}
                      id={titleInfo.one.id}
                      onClick={handleHeartClick}
                    ></i>
                  </div>
                </div>
                {/* Favourite One Ends*/}
                {/* Favourite Two Begins */}
                <div className="favourite">
                  <a
                    href={titleInfo.two.watchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <h4 className="suggestion-h4 ">{titleInfo.two.title}</h4>
                  </a>
                  <div className="suggestion-image-container">
                    <a
                      href={titleInfo.two.watchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <img
                        className="suggestion-image"
                        src={titleInfo.two.poster}
                        alt={`${titleInfo.two.title} poster`}
                      />
                    </a>
                  </div>

                  <div className="suggestion-links">
                    {" "}
                    <a
                      href={`https://www.imdb.com/title/${titleInfo.two.imdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-info-circle"></i>
                    </a>
                    <i
                      className={`bi bi-heart-fill`}
                      id={titleInfo.two.id}
                      onClick={handleHeartClick}
                    ></i>
                  </div>
                </div>
                {/* Favourite TwoEnds*/}
                {/* Favourite Three Begins */}
                <div className="favourite">
                  <a
                    href={titleInfo.three.watchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <h4 className="suggestion-h4 ">{titleInfo.three.title}</h4>
                  </a>
                  <div className="suggestion-image-container">
                    <a
                      href={titleInfo.three.watchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <img
                        className="suggestion-image"
                        src={titleInfo.three.poster}
                        alt={`${titleInfo.three.title} poster`}
                      />
                    </a>
                  </div>

                  <div className="suggestion-links">
                    {" "}
                    <a
                      href={`https://www.imdb.com/title/${titleInfo.three.imdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-info-circle"></i>
                    </a>
                    <i
                      className={`bi bi-heart-fill`}
                      id={titleInfo.three.id}
                      onClick={handleHeartClick}
                    ></i>
                  </div>
                </div>
                {/* Favourite Three Ends*/}
                {/* Favourite Four  Begins */}
                <div className="favourite">
                  <a
                    href={titleInfo.four.watchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <h4 className="suggestion-h4 ">{titleInfo.four.title}</h4>
                  </a>
                  <div className="suggestion-image-container">
                    <a
                      href={titleInfo.four.watchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <img
                        className="suggestion-image"
                        src={titleInfo.four.poster}
                        alt={`${titleInfo.four.title} poster`}
                      />
                    </a>
                  </div>

                  <div className="suggestion-links">
                    {" "}
                    <a
                      href={`https://www.imdb.com/title/${titleInfo.four.imdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-info-circle"></i>
                    </a>
                    <i
                      className={`bi bi-heart-fill`}
                      id={titleInfo.four.id}
                      onClick={handleHeartClick}
                    ></i>
                  </div>
                </div>
                {/* Favourite Four Ends*/}
              </div>
            </section>
            {/* Favourites Section Begins */}
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Profile;
