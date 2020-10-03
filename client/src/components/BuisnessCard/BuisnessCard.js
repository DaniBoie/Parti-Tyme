import React from "react";
import { Link } from "react-router-dom";
import "./BusinessCard.css";
import StarRating from "../StarRating/StarRating.js";
import StarRatings from "react-star-ratings";

import ExampleImage from "../../components/assets/images/business-2.jpg";

const BuisnessCard = (props) => {
  function handleContactButton() {
    localStorage.setItem("pickBusiness", `${props.business._id}`);
  }

  return (
    <div className="business-card">
      {/* Left Column / Image + Rating Star */}
      <div className="bc-left-column">
        <div className="bc-business-image">
          <img src={ExampleImage} alt="Business Profile Picture" />
        </div>

        {/* <StarRating /> */}
        <StarRatings
          rating={3}
          starRatedColor="yellow"
          // changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="5px"
        />
      </div>

      {/* Right Column / Business Basic Info */}
      <div className="bc-right-column">
        <h1>{props.business.name}</h1>
        <h2>{props.business.location}</h2>
        <h2>${props.business.fee}/hr</h2>
        <h3>Put a slogan here (about 10-13-15 words)</h3>

        <Link to="/businessprofile" onClick={handleContactButton}>
          More Detail...
        </Link>
      </div>
    </div>
  );
};

export default BuisnessCard;
