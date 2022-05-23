import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profile.css";
import React, {useEffect, useState} from "react";
import Axios, * as axios from "axios";

function Profile() {
  //create empty array for returning the name of the user and favourites
  const [profilename, setProfilename] = useState([])


  //get request to API end point in the backend
  useEffect = () => {
    Axios.get("http://localhost:3000/profile")
    .then((response) =>{
      console.log(response.data)
      setProfilename(response.data)
    }
    )
  }


  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="light-gradient h-100 d-flex flex-column justify-content-center align-items-center">
          <h3 className="h3 mb-4" >
          <div className="Name">
           {profilename.map((value, key) => {
              return <div className="Name"> 
                <h3>{value.Name}'s favourites</h3>
                <h3>{value.Title}</h3>
              </div>
              
            })
            }
          
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
