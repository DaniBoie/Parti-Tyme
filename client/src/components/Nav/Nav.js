import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importing Styling Elements
import "./nav.css";

// Importing Logo Image
import Logo from "../assets/images/logos.png";

const Nav = (props) => {

  return (
    <>
      <nav className="nav-bar">
        {/* Left column / Logo */}
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          {/* <div>{windowWidth}</div> */}
        </div>

        {/* Middle Column / Search Bar */}
        <div className="nav-middle-column">
          <h1>{props.name}</h1>
        </div>

        {/* Right column / Account */}
        <div className="nav-account">
          <Link to="/login" className="nav-login-logout-btn">
            {/* <button className="nav-login-logout-btn">Login/Logout</button> */}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </Link>



        </div>
      </nav>

    </>
  );
};

// </nav>

export default Nav;
