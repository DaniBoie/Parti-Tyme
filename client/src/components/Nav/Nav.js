import React from 'react'
import { Link } from "react-router-dom";




const Nav = () => {
  return (
    <>
    <nav>
    <form className = "navForm" action="">
      <input className = "navInput" type="text" placeholder="Search ..."/>
        <a href="#"><i className="fa fa-search"></i></a> 
    </form>
  </nav>
  </>
  )
}

export default Nav