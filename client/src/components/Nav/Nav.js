import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Nav.css'

const Nav = () => {

  // const [showItems, setShowItems] = useState({
  //   change: ""
  // })
  // function handleMenuBtn() {
  //   if (showItems.change === "show")
  //   {
  //     setShowItems({change: ""})
  //     console.log(showItems.change)
  //   }
  //   else {
  //     setShowItems({change: "show"})
  //     console.log(showItems.change)
  //   }
  // }

  return (
    <nav className= "nav-bar">
      <div className="menu-button" onClick={handleMenuBtn}>
        <div className="button-line"></div>
        <div className="button-line"></div>
        <div className="button-line"></div>
      </div>

      <form className = "navForm">
        <input className = "navInput" type="text" placeholder="Search ..."/>
        <button className="search-button"><i className="fa fa-search"></i></button>
      </form>

      

      {/* <div className="menu-button" onClick={handleMenuBtn}>
        <div className="button-line"></div>
        <div className="button-line"></div>
        <div className="button-line"></div>
      </div>


      <div className={`nav-items ${showItems.change}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/businessprofile" className="nav-link">BusinessProfile</Link>
        <Link to="/businessview" className= "nav-link">BusinessView</Link>
        <Link to="/login" className= "nav-link">Login</Link>
        <Link to="/userprofile" className= "nav-link">UserProfile</Link>
      </div>

      <button className="logButton">Login</button> */}

    </nav>
  )
}

export default Nav

