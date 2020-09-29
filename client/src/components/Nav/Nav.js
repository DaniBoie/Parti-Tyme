import React, { useState } from "react";
import { Link } from "react-router-dom";

// Importing Styling Elements
import "./nav.css";

// Importing Logo Image
import Logo from "../assets/images/logos.png";

const Nav = () => {
  const [showItems, setShowItems] = useState({
    show: "",
  });

  function handleAccountBtn() {
    if (showItems.show === "") setShowItems({ show: "show" });
    else setShowItems({ show: "" });
  }

  return (
    <>
      <nav className="nav-bar">
        {/* Left column / Logo */}
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Middle Column / Search Bar */}
        <div className="nav-search-bar">
          <input type="text" placeholder="Search ..." />
          <button className="nav-search-button">
            <i className="fa fa-search"></i>
          </button>
        </div>

        {/* Right column / Account */}
        <div className="nav-account">
          <button className="nav-account-btn" onClick={handleAccountBtn}>
            Your Account <i class="fas fa-caret-down"></i>
          </button>

          <div className={`nav-account-items ${showItems.show}`}>
            <Link to="/userprofile" className="nav-account-link">
              Profile
            </Link>
            <Link to="/businessprofile" className="nav-account-link">
              Business Profile
            </Link>
            <Link to="/login" className="nav-account-link">
              Login
            </Link>
            <Link to="/logout" className="nav-account-link">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

// </nav>

export default Nav;
