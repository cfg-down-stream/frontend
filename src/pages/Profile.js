import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profile.css";
import React, { useEffect, useState, useContext } from "react";
import Axios, * as axios from "axios";
import { Context } from "../store/Store";

function Profile() {
  //create empty array for returning the name of the user and favourites
  const [profileName, setProfileName] = useState("");
  const [titleIds, setTitleIds] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [titleInfo, setTitleInfo] = useState({
    one: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
    },
  
    two: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
    },
    three: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",
    },
    four: {
      title: "title",
      id: "id",
      poster: "/",
      watchLink: "/",

    },
  });

  //get request to API end point in the backend, send data to handleResponse func
  useEffect(() => {
    Axios.get(`http://localhost:3000/profile/${state.id}`).then((response) => {
      console.log(response.data)
      const data = response.data;
      handleResponse(data);
    });
  }, []);

  // Add data from GET api to array
  function handleResponse(data) {
    setTitleIds(
      data.map((id) => {
        return id.title_ids;
      })
    );
    console.log(titleIds);
    apiCall();
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

 async function apiCall() {
    const dataArray = [];
    titleIds.map((id) => {
      const apiKey = "NuY1wbXmkOwxSZp6anpgcJR6oCmxJ06tTrDwJpNN";
      const apiUrl = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`;
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then((json) => {
          let data = json;
          dataArray.push(data);
          return dataArray;
        })
        .then(function (dataArray) {
          // Call the updateStates function with the dataArray as an argument
          updateStates(dataArray);
        })
        .catch((err) => console.error(err));
    });
  }


return (
  <div className="container-fluid h-100">
    <div className="row h-100 mx-4">
      <div className="col d-flex flex-column p-0">
        <Header />
        {/* Main Gradient Section Begins */}
        <main className="no-gradient h-100 d-flex flex-column justify-content-center align-items-center">
        <h3 className="favourite-h3">{state.name}'s <span className="text-black"> Favourites </span></h3>
            <section className="favourite-section">
             <div className="favourite-container">
             {/* Favourite One Begins*/}
        <div className="favourite">
          <a
            href={titleInfo.one.watchLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <h4 className="favourite-h4 ">{titleInfo.one.title}</h4>
          </a>
          <div className="favourite-image-container">
            <a
              href={titleInfo.one.watchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                className="favourite-image"
                src={titleInfo.one.poster}
                alt={`${titleInfo.one.title} poster`}
              />
            </a>
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
            <h4 className="favourite-h4 ">{titleInfo.two.title}</h4>
          </a>
          <div className="favourite-image-container">
            <a
              href={titleInfo.two.watchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                className="favourite-image"
                src={titleInfo.two.poster}
                alt={`${titleInfo.two.title} poster`}
              />
            </a>
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
            <h4 className="favourite-h4 ">{titleInfo.three.title}</h4>
          </a>
          <div className="favourite-image-container">
            <a
              href={titleInfo.three.watchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                className="favourite-image"
                src={titleInfo.three.poster}
                alt={`${titleInfo.three.title} poster`}
              />
            </a>
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
            <h4 className="favourite-h4 ">{titleInfo.four.title}</h4>
          </a>
          <div className="favourite-image-container">
            <a href={titleInfo.four.watchLink}>
              {" "}
              <img
                className="favourite-image"
                src={titleInfo.four.poster}
                alt={`${titleInfo.four.title} poster`}
              />
            </a>
          </div>
        </div>
        {/* Favourite FOUR Ends*/}
      </div>
    </section>
        </main>
        {/* Main Gradient Section Ends */}
        <Footer />
      </div>
    </div>
  </div>
  );
}
export default Profile;
