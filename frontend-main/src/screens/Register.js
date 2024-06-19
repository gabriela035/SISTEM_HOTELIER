import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/hotel_logo.png";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cnp, setCnp] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const signUpStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  };

  const authInnerStyle = {
    width: "450px",
    margin: "auto",
    background: "#ffffff",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    padding: "40px 55px 45px 55px",
    borderRadius: "15px",
    transition: "all 0.3s",
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  function handleSignUp() {
    if (!firstName || !lastName || !cnp || !address || !email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setError("");

    const user = {
      first_name: firstName,
      last_name: lastName,
      CNP: cnp,
      address: address,
      email,
      password,
    };

    register(user)
      .then(() => {
        alert("Success!");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        setError("Invalid credentials!");
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <img
        src={logo}
        alt="Hotel Logo"
        style={{ width: "120px", marginBottom: "20px" }}
      />
      <div style={signUpStyle}>
        <div style={authInnerStyle}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {error && firstName === "" && (
            <p style={{ color: "red" }}>First Name is required</p>
          )}

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {error && lastName === "" && (
            <p style={{ color: "red" }}>Last Name is required</p>
          )}

          <div className="mb-3">
            <label>CNP</label>
            <input
              type="text"
              className="form-control"
              placeholder="CNP"
              value={cnp}
              onChange={(e) => setCnp(e.target.value)}
            />
          </div>
          {error && cnp === "" && (
            <p style={{ color: "red" }}>CNP is required</p>
          )}

          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {error && address === "" && (
            <p style={{ color: "red", marginTop: 1 }}>Address is required</p>
          )}

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && (
            <p style={{ color: "red", marginTop: 1 }}>{emailError}</p>
          )}
          {error && email === "" && (
            <p style={{ color: "red", marginTop: 1 }}>Email is required</p>
          )}

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && password === "" && (
            <p style={{ color: "red", marginTop: 1 }}>Password is required</p>
          )}

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          {error !== "" && (
            <p className="mt-3" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <p className="forgot-password text-right mt-3">
            Already registered <a href="/login">sign in?</a>
          </p>
        </div>
      </div>
    </div>
  );
}
