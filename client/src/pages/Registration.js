import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [countryFrom, setCountryFrom] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [profession, setProfession] = useState("");

  let navigate = useNavigate();

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        username: username,
        mobile: mobileNumber,
        dob: dob,
        countryfrom: countryFrom,
        currentcountry: currentCountry,
        mothertongue: motherTongue,
        profession: profession,
      })
      .then((response) => {
        console.log(response);
        alert("Registration Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);

        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div className="form">
      <h1>Registration</h1>
      {/* Mobile Number */}
      <label>Mobile Number: </label>
      <input
        type="tel"
        onChange={(event) => {
          setMobileNumber(event.target.value);
        }}
      />
      {/* Username */}
      <label>Username: </label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      {/* Date of Birth */}
      <label>Date of Birth: </label>
      <input
        type="date"
        onChange={(event) => {
          setDob(event.target.value);
        }}
      />
      {/* Country From */}
      <label>Country From: </label>
      <input
        type="text"
        onChange={(event) => {
          setCountryFrom(event.target.value);
        }}
      />
      {/* Current Country */}
      <label>Current Country: </label>
      <input
        type="text"
        onChange={(event) => {
          setCurrentCountry(event.target.value);
        }}
      />
      {/* Mother Tongue */}
      <label>Mother Tongue: </label>
      <input
        type="text"
        onChange={(event) => {
          setMotherTongue(event.target.value);
        }}
      />
      {/* Profession */}
      <label>Profession: </label>
      <input
        type="text"
        onChange={(event) => {
          setProfession(event.target.value);
        }}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Registration;
