import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [countryFrom, setCountryFrom] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/profile/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        const userData = response.data.user || {};

        setUsername(userData.username);
        setMobileNumber(userData.mobile);
        setDob(userData.dob);
        setCountryFrom(userData.countryfrom);
        setCurrentCountry(userData.currentcountry);
        setMotherTongue(userData.mothertongue);
        setProfession(userData.profession);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div>
        <p>Username: {username}</p>
        <p>Mobile Number: {mobileNumber}</p>
        <p>Date of birth: {dob}</p>
        <p>Country From: {countryFrom}</p>
        <p>Current Country: {currentCountry}</p>
        <p>Mother Tongue: {motherTongue}</p>
        <p>Profession: {profession}</p>
      </div>
    </div>
  );
}

export default Profile;
