import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/businessprofile">BusinessProfile</Link>
      <Link to="/businessview">BusinessView</Link>
      <Link to="/login">Login</Link>
      <Link to="/userprofile">UserProfile</Link>
    </>
  )
}

export default Nav