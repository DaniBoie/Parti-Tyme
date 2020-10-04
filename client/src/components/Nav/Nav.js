import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

// Importing Styling Elements
import "./Nav.css";

// Importing Logo Image
import Balloon from "../assets/images/balloon.png";

const Nav = (props) => {
  // Function for dropdown menu
  const [dropdownState, setDropdownState] = useState({
    show: "",
    hideLogin: "",
    hideHamburger: "hideExistence",
  });

  const [businessStatus, setBusinessStatus] = useState({
    hideBusinessProfile: "hideExistence",
  });

  const [userState, setUserState] = useState({
    user: "",
  });

  const handleBusinessButton = () => {
    console.log(userState.user)
  }

  dropdownState.handleHamburgerButton = () => {
    if (dropdownState.show === "") {
      setDropdownState({ ...dropdownState, show: "show" });
    } else setDropdownState({ ...dropdownState, show: "" });
  };

  function handleLogoutButton() {
    localStorage.removeItem("user");
    setDropdownState({
      ...dropdownState,
      show: "",
      hideLogin: "",
      hideHamburger: "hideExistence",
    });
    window.location = "/businessview";
  }


  useEffect(() => {
    if (window.location.pathname === "/login") {
      setDropdownState({
        ...dropdownState,
        hideLogin: "hideExistence",
      });
    }

    API.getUser()
      .then(({ data }) => {
        setDropdownState({
          ...dropdownState,
          hideLogin: "hideExistence",
          hideHamburger: "",
        });

        if (data[0].Buisness) {
          setBusinessStatus({
            hideBusinessProfile: "",
          });
        }

        setUserState({ ...userState, user: data[0].Buisness._id})
        
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <nav className="nav-bar">
      {/* Left column / Logo */}
      <div className="nav-logo">
        {/* <Link to="/">
            <img src={Logo1} alt="Logo" />
          </Link> */}
      </div>

      {/* Middle Column / Search Bar */}
      <div className="nav-middle-column">
        <img src={Balloon} alt="Logo" />
        <Link to="/businessview">PARTI-TYME</Link>
        <img src={Balloon} alt="Logo" />
      </div>

      {/* Right column / Account */}

      {/* Login Button - disappear when the user is logged in */}
      <div className="nav-account">
        <Link
          to="/login"
          className={`nav-login-logout-btn ${dropdownState.hideLogin}`}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </Link>

        {/* For responsive */}
        <Link
          to="/login"
          className={`nav-login-logout-btn-icon ${dropdownState.hideLogin}`}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="fas fa-sign-in-alt"></i>
        </Link>
        {/* End Login Button */}

        <button
          className={`nav-hamburger-icon ${dropdownState.hideHamburger}`}
          onClick={dropdownState.handleHamburgerButton}
        >
          <i class="fas fa-bars"></i>
        </button>
        <div className={`nav-dropdown-menu ${dropdownState.show}`}>
          <Link
            to="/businessprofile"
            onClick={() => {localStorage.setItem("pickBusiness", userState.user);}}
            className={`nav-dropdown-items ${businessStatus.hideBusinessProfile}`}
          >
            Business Profile
          </Link>
          <Link to="/userprofile" className="nav-dropdown-items">
            Profile
          </Link>
          <button onClick={handleLogoutButton} className="nav-dropdown-items">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

// </nav>

export default Nav;
