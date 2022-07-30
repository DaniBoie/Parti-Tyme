import React from "react";
import { Link } from "react-router-dom";
import "./BusinessCard.css";
// import StarRating from "../StarRating/StarRating.js";
import StarRatings from "react-star-ratings";
import Logo from "../../components/assets/images/logos.png";

// import ExampleImage from "../../components/assets/images/business-2.jpg";
// import API from "../../utils/API";
// import axios from "axios";
// AVAILABLE TODAY FILTER / FUNCTIONALITY
const BuisnessCard = (props) => {
  function handleContactButton() {
    localStorage.setItem("pickBusiness", `${props.business._id}`);
    window.location = '/businessprofile';
  }

  let img

  if (props.business.logo){
    img = props.business.logo
  } else {
    img = Logo
  }

  return (
    <div className="business-card">
      {/* Left Column / Image + Rating Star */}
      <div className="bc-left-column">
        <div className="bc-business-image">
          <img src={img} alt="Business Profile" />
        </div>

        {/* <StarRating /> */}
          <StarRatings
            rating={props.business.rating}
            starRatedColor="#ffa534"
            starEmptyColor="#636e72"
            // changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="3px"
            className="blockClass"
            // ignoreInlineStyles="true"
          />  
      </div>

      {/* Right Column / Business Basic Info */}
      <div className="bc-right-column" onClick={handleContactButton}>
        <h1>{props.business.name}</h1>
        <h2>{props.business.location}</h2>
        <h2>${props.business.fee}/hr</h2>
        <h3>{props.business.slogan}</h3>

        {/* <Link to="/businessprofile" onClick={handleContactButton}>
          View Business
        </Link> */}
      </div>
    </div>
  );
};

export default BuisnessCard;
