import React, { useState, useEffect } from "react";
import alert from "alert";
// import axios from 'axios'
import API from "../../utils/API";
import "./Login.css";

import Nav from "../../components/Nav";

function Login() {
  const [accountState, setAccountState] = useState({
    loginUsername: "",
    loginPassword: "",
    password1: "",
    password2: "",
    userEmail: "",
    username: "",
    realname: "",
    user: [],
  });

  const user = {
    realname: accountState.realname,
    email: accountState.userEmail,
    username: accountState.username,
    password: accountState.password1,
    account_type: 1,
  };

  const userLogin = {
    username: accountState.loginUsername,
    password: accountState.loginPassword,
  };

  accountState.handleInputChange = (event) => {
    setAccountState({
      ...accountState,
      [event.target.name]: event.target.value,
    });
  };

  accountState.handleCheck = (event) => {
    event.preventDefault();
    API.loginUser(userLogin)
      .then(({ data: token }) => {
        if (token) {
          localStorage.setItem("user", token);
          window.location = "/businessview";
        } else {
          console.log("invalid credentials");
          alert("Invalid User Name or Password");
        }
      })
      .catch((err) => console.log(err));
  };

  // Function for Submit Button
  accountState.handleSignUp = (event) => {
    event.preventDefault();
    console.log(accountState.password1);
    if (accountState.password1 === accountState.password2) {
      console.log("passmatch");
      console.log(accountState.password1);
      API.registerUser(user)
        .then((res) => {
          setAccountState({
            ...accountState,
            realname: "",
            userEmail: "",
            username: "",
            password1: "",
            password2: "",
          });
          console.log(res);
          alert("Account Created and Ready to be Used :)");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Unmatched Password");
    }
  };

  useEffect(() => {
    API.getUser()
      .then(() => {
        window.location = "/businessview";
      })
      .catch((err) => {
        console.log("not in");
        console.log(err);
      });
  }, []);

  return (
    <>
      <Nav name="Login/Signup" />
      <div className="login-page">
        {/* Left Column / Login Box */}
        <div className="login-area">
          <form className="login-form">
            <i className="fa fa-user"></i>
            <h1>Login</h1>
            <input
              type="text"
              name="loginUsername"
              placeholder="User Name"
              onChange={accountState.handleInputChange}
            />
            <input
              type="password"
              name="loginPassword"
              placeholder="Password"
              onChange={accountState.handleInputChange}
            />
            <a href="#">Forgot Password?</a>

            <input
              type="submit"
              name="submit"
              value="Login"
              onClick={accountState.handleCheck}
            />
          </form>
        </div>

        <div className="most-valuable-or">OR</div>

        <div className="signup-area">
          <form className="signup-form">
            <i className="fas fa-user-plus"></i>
            <h1>Sign Up</h1>
            <input
              type="text"
              name="userEmail"
              value={accountState.userEmail}
              placeholder="Your Email"
              onChange={accountState.handleInputChange}
            />
            <input
              type="text"
              name="username"
              value={accountState.username}
              placeholder="User Name"
              onChange={accountState.handleInputChange}
            />
            <input
              type="text"
              name="realname"
              value={accountState.realname}
              placeholder="Your Name"
              onChange={accountState.handleInputChange}
            />
            <input
              type="password"
              name="password1"
              value={accountState.password1}
              placeholder="Password"
              onChange={accountState.handleInputChange}
            />
            <input
              type="password"
              name="password2"
              value={accountState.password2}
              placeholder="Confirm Password"
              onChange={accountState.handleInputChange}
            />
            <input
              type="submit"
              name="submit"
              value="Submit"
              onClick={accountState.handleSignUp}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
