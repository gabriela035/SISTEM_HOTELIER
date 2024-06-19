import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Spinner } from "react-bootstrap";
import logo from "../assets/hotel_logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const { loginWithHook } = useLogin();
  const handleLogin = async () => {
    const user = { email, password };
    loginWithHook(user)
      .then((d) => {
        setLoading(true);
        window.location.href = "/";
        console.log(d.data);
      })
      .catch((e) => {
        console.log(e);
        //setLoading(true);
        setError("Invalid credentials!");
      });

    // login(user);
    // const res = (await axiosInstance.post('/api/users/login', user)).data
    // localStorage.setItem('currentUser', JSON.stringify(res));

    // window.location.href = '/';
  };

  const loginStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50px",
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

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: 300 }}
      >
        <Spinner variant="primary" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src={logo}
        alt="Hotel Logo"
        style={{ width: "120px", marginBottom: "20px" }}
      />
      <div style={loginStyle}>
        <div style={authInnerStyle}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
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
              onChange={handlePasswordChange}
            />
          </div>
          {error && password === "" && (
            <p style={{ color: "red", marginTop: 1 }}>Password is required</p>
          )}
          <div className="mb-3"></div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
          {error && (
            <p className="mt-3" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <p className="forgot-password text-right mt-3">
            Or <a href="/register">sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
