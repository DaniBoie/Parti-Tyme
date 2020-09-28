import React from 'react'
import BusinessImage4 from "../../components/images/business-4.jpg";

const Card = (props) => {

  return (
    <>

<div className="business-card">

  <div className="business-title">
  <h3>{props.business.name}</h3>
  </div>
  <img
    className="business-image"
          src={props.business.img}
    alt="business1"
  />
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

</>
  )
}

export default Card