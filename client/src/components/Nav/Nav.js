import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importing Styling Elements
import "./nav.css";

// Importing Logo Image
import Logo from "../assets/images/logos.png";
import Logo1 from "../assets/images/logo1.png";
import Logo2 from "../assets/images/logo2.png";
import Balloon from "../assets/images/balloon.png";

const Nav = (props) => {
  // In Process function, for the purpose of making responsive website
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResizeWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeWidth);
  }, []);

  const [windowheight, setWindowHeight] = useState(window.innerHeight);

  const handleResizeHeight = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeHeight);
  }, []);
  // End Process Function

  return (
    <>
      <nav className="nav-bar">
        {/* Left column / Logo */}
        <div className="nav-logo">
          {/* <Link to="/">
            <img src={Logo1} alt="Logo" />
          </Link> */}
          <div>window width: {windowWidth}</div>
          <div>window height: {windowheight}</div>
        </div>

        {/* Middle Column / Search Bar */}
        <div className="nav-middle-column">
          <img src={Balloon} alt="Logo" />
          {/* <h1>{props.name}</h1> */}
          <h1>PARTI-TYME</h1>
          <img src={Balloon} alt="Logo" />
        </div>

        {/* Right column / Account */}
        <div className="nav-account">
          <Link to="/login" className="nav-login-logout-btn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </Link>

          {/* For responsive */}
          <Link to="/login" className="nav-login-logout-btn-icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <i class="fas fa-sign-in-alt"></i>
          </Link>
        </div>
      </nav>
    </>
  );
};

// </nav>

export default Nav;
