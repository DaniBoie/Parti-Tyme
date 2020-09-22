import React from 'react'
import { Link } from "react-router-dom";
import "./nav.css"




const Nav = () => {
  return (
    <>
    <nav>
    <form className = "navForm" action="">
      <input className = "navInput" type="text" placeholder="Search ..."/>
        <Link to ="/"><i className="fa fa-search"/> </Link>
    </form>
    </nav>
  </>
  )
}

export default Nav