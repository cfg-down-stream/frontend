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
  const [titleimage, setTitleimage] = useState({ titleIds });

  //get request to API end point in the backend
  useEffect(() => {
    Axios.get(`http://localhost:3000/profile/${state.id}`).then((response) => {
      // console.log("Data: " + response.data);
      const data = response.data;
      handleResponse(data);
    });
  }, []);

  // Use the data from the GET api response
  function handleResponse(data) {
    setTitleIds(
      data.map((row) => {
        return row.Title_id;
      })
    );

    // console.log("Title Ids: " + titleIds);
    apiCall();
  }

  // function APIcall() {
  //   const apiKey = NuY1wbXmkOwxSZp6anpgcJR6oCmxJ06tTrDwJpNN;
  //   titleimage.map(Axios.get(`https://api.watchmode.com/v1/title/${state.id}/details/?apiKey=${apiKey}&append_to_response=sources`)
  //   )
  //   .then((response) => {
  //     console.log(response)
  //   })
  // }

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
        })
        .catch((err) => console.error(err));
    });

    // Array with info of all ids
    console.log(dataArray);
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
                  {/* <p>{favourites[0].name}</p> */}
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
