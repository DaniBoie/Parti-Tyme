import React, { useState } from 'react'
import "./BusinessView.css"

// Importing Example Images
import BusinessImage1 from '../../components/images/business-1.jpg'
import BusinessImage2 from '../../components/images/business-2.jpg'
import BusinessImage3 from '../../components/images/business-3.jpg'
import BusinessImage4 from '../../components/images/business-4.jpg'
// import BusinessImage5 from '../../components/images/business-5.jpg'

const BuisnessView = () => {
  // const [, ] = useState({
  // })

  //   // HANDLING the inputs on the page.
  // ____.handleInputChange = event => {
  //   set___State({...___State, [event.target.name]: event.target.value})
  // }

  return ( 
    <div className="business-view">
      <div className="categories">
        <a href='https://www.google.com/'>Food</a>
        <a href='https://www.google.com/'>Music</a>
        <a href='https://www.google.com/'>Rentals</a>
        <a href='https://www.google.com/'>Catering</a>
        <a href='https://www.google.com/'>Catering</a>
        <a href='https://www.google.com/'>Catering</a>
        <a href='https://www.google.com/'>Catering</a>
      </div>

      <div className="business-view-main-content">
        <div className="business-view-main-box">
          
          <div className="filter-column">
            <h2>Filters</h2>
            <div className="filter-list">
              <label className="filter-items"> Lorem
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>

              <label className="filter-items"> ipsum
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>
              
              <label className="filter-items"> dolor
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>

              <label className="filter-items"> sit
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>

              <label className="filter-items"> consectetur
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>

              <label className="filter-items"> adipisicing
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>

              <label className="filter-items"> Tempora
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>

          <div className="business-column">

            <div className="business-card">
              <div className="business-title">
                <h3>Business 1 Title </h3>
              </div>
              <img className="business-image" src={BusinessImage1} alt="business1"/>
              <div className="business-note">
                <ul>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                </ul>
              </div>
              <div className="business-info">
                <ul>
                  <li>
                    <h4>Harum doloremque repellat distinctio</h4>

                  </li>
                  <li>
                    <h4>Minima repellat</h4>
                  </li>
                </ul>
              </div>
              <div className="business-rate">
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
              </div>
            </div>

            <div className="business-card">
              <div className="business-title">
                <h3>Business 2 Title </h3>
              </div>
              <img className="business-image" src={BusinessImage2} alt="business1"/>
              <div className="business-note">
                <ul>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                </ul>
              </div>
              <div className="business-info">
                <ul>
                  <li>
                    <h4>Harum doloremque repellat distinctio</h4>

                  </li>
                  <li>
                    <h4>Minima repellat</h4>
                  </li>
                </ul>
              </div>
              <div className="business-rate">
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
              </div>
            </div>

            <div className="business-card">
              <div className="business-title">
                <h3>Business 3 Title </h3>
              </div>
              <img className="business-image" src={BusinessImage3} alt="business1"/>
              <div className="business-note">
                <ul>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                </ul>
              </div>
              <div className="business-info">
                <ul>
                  <li>
                    <h4>Harum doloremque repellat distinctio</h4>

                  </li>
                  <li>
                    <h4>Minima repellat</h4>
                  </li>
                </ul>
              </div>
              <div className="business-rate">
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
              </div>
            </div>

            <div className="business-card">
              <div className="business-title">
                <h3>Business 4 Title </h3>
              </div>
              <img className="business-image" src={BusinessImage4} alt="business1"/>
              <div className="business-note">
                <ul>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                  <li>
                    <h4>Incidunt vitae facilis</h4>
                    <p>Numquam, blanditiis</p>
                  </li>
                </ul>
              </div>
              <div className="business-info">
                <ul>
                  <li>
                    <h4>Harum doloremque repellat distinctio</h4>

                  </li>
                  <li>
                    <h4>Minima repellat</h4>
                  </li>
                </ul>
              </div>
              <div className="business-rate">
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
                <span className="rating-circles"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuisnessView