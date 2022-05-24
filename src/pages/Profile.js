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
      title: "",
      id: "",
      poster: "/",
      watchLink: "/",
      imdbId: "",
    },
    two: {
      title: "",
      id: "",
      poster: "/",
      watchLink: "/",
      imdbId: "",
    },
    three: {
      title: "",
      id: "id",
      poster: "/",
      watchLink: "/",
      imdbId: "",
    },
    four: {
      title: "",
      id: "",
      poster: "/",
      watchLink: "/",
      imdbId: "",
    },
  });

  //get request to API end point in the backend, send data to handleResponse func
  useEffect(() => {
    Axios.get(`http://localhost:3000/profile/${state.id}`).then((response) => {
      const data = response.data;
      handleResponse(data);
    });
  }, []);

  // Add data from GET api to array
  function handleResponse(data) {
    setTitleIds(
      data.map((row) => {
        return row.Title_id;
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

  function apiCall() {
    const dataArray = [];
    titleIds.map((id) => {
      const apiKey = "NuY1wbXmkOwxSZp6anpgcJR6oCmxJ06tTrDwJpNN";
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
          <main className="light-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            <h3 className="h3 mb-4">
              <div className="Name">
                <div className="Name">
                  <h3>{state.name}'s Favourites</h3>
                  <h3>{titleIds}</h3>
                  <p>{titleInfo.one.title}</p>
                  <p>{titleInfo.two.title}</p>
                </div>
              </div>
            </h3>
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Profile;
