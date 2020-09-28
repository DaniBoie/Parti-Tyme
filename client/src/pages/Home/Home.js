<<<<<<< HEAD
import React from 'react'
import "./Home.css"
=======
import React, { useState } from "react";
import "./Home.css";
>>>>>>> 43ba107bbb9fe2a421895ca2354d4e3cb27f315c

const Home = () => {
  // const [, ] = useState({
  // })

  //   // HANDLING the inputs on the page.
  // ____.handleInputChange = event => {
  //   set___State({...___State, [event.target.name]: event.target.value})
  // }

  return (
    <div className="home-page">
      {/* Left Column / Filter Area */}
      <div className="home-filter-column">
        <h2>Filters</h2>

        <div className="filter-list">
          <label className="filter-items">
            {" "}
            Lorem
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="filter-items">
            {" "}
            ipsum
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="filter-items">
            {" "}
            dolor
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="filter-items">
            {" "}
            sit
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="filter-items">
            {" "}
            consectetur
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="filter-items">
            {" "}
            adipisicing
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="filter-items">
            {" "}
            Tempora
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>

      <div className="home-content-column">
        <h2>Lorem</h2>
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          minima in recusandae asperiores unde quasi, consequatur excepturi
          laudantium aliquid delectus alias voluptatum necessitatibus laborum
          tenetur assumenda enim accusantium nisi aliquam?
        </p>
      </div>

      <div className="home-side-bar"></div>
    </div>
  );
};

export default Home;
