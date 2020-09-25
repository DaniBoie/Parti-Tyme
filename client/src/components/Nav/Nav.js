import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Logo from "../images/business-5.jpg";

const Nav = () => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // const handleResize = () => {
  //   setWindowWidth(window.innerWidth)
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize)
  // })
  {
    /* <div>{windowWidth}</div> */
  }

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
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="nav-search-bar">
          <input type="text" placeholder="Search ..." />
          <button className="nav-search-button">
            <i className="fa fa-search"></i>
          </button>
        </div>

        <div className="nav-account">
          <button className="nav-account-btn" onClick={handleAccountBtn}>
            Your Account <i class="fas fa-caret-down"></i>
          </button>
          <ul>
            <li>
              <Link to="/userprofile" className="nav-dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <a href="/" className="nav-dropdown-item">
                Log in
              </a>
            </li>
            <li>
              <a href="/" className="nav-dropdown-item">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`nav-items ${showItems.show}`}>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/businessprofile" className="nav-link">
          BusinessProfile
        </Link>
        <Link to="/businessview" className="nav-link">
          BusinessView
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/userprofile" className="nav-link">
          UserProfile
        </Link>
      </div>
    </>

    // </nav>
  );
};

export default Nav;
