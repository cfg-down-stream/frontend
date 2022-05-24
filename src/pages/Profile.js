import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import Axios, * as axios from "axios";

function Profile() {
  //create empty array for returning the name of the user and favourites
  const [profileName, setProfileName] = useState("");
  const [titleIds, setTitleIds] = useState([]);
  // const [titleinformation, set] = useState({//nested objects, title, title id, image link, watch link})
  
  
  //get request to API end point in the backend
  useEffect(() => {
    Axios.get("http://localhost:3000/profile").then((response) => {
      console.log(response.data);
      const data = response.data;
      handleResponse(data);
    });
  }, []);

  // Use the data from the GET api response
  function handleResponse(data) {
    // Set profile name
    setProfileName(data[0].Name);
    console.log("Name: " + profileName);

    // For each title_id in the response, push to titleId state array
    setTitleIds(
      data.map((row) => {
        return row.Title_id;
      })
    );

    console.log("Title Ids: " + titleIds);
  }
// function APIcall() {
//   //map through the titleids, Inside of map paste axios get, then console the response
//   Axios.get(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`)
// }


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
                  <h3>{profileName}'s Favourites</h3>
                  <h3>{titleIds}</h3>
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
