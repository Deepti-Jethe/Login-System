import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");

  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const generateOTP = () => {
    if (!mobileNumber) {
      alert("Please enter a mobile number");
      return;
    }
    axios
      .post("http://localhost:3001/generateotp", {
        mobile: mobileNumber,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setGeneratedOTP(response.data.otp);
          alert(`OTP: ${response.data.otp}`);
        }
      });
  };

  const login = () => {
    if (!mobileNumber) {
      alert("Please enter a mobile number");
      return;
    }
    if (!OTP) {
      alert("Please enter the OTP");
      return;
    }
    if (parseInt(OTP) === parseInt(generatedOTP)) {
      axios
        .post("http://localhost:3001/login", {
          mobile: mobileNumber,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message) {
            alert(response.data.message);
          } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });

            navigate(`/profile/${response.data.id}`);
          }
        });
    } else {
      alert(`Incorrect OTP!`);
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <label>Mobile Number: </label>
      <input
        type="tel"
        onChange={(event) => {
          setMobileNumber(event.target.value);
        }}
      />
      <button onClick={generateOTP}>Generate OTP</button>
      <label>OTP: </label>
      <input
        type="number"
        onChange={(event) => {
          setOTP(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
