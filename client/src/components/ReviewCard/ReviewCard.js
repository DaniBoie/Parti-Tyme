import React from "react";
import "./ReviewCard.css";

import StarRatings from "react-star-ratings";
import ExamplePic1 from "../assets/images/business-1.jpg";
const ReviewCard = (props) => {
  console.log(props);
  return (
    <div className="Review-Card">
      <div className="rc-profile-left">
        <div className="rc-profile-image">
          <img src={ExamplePic1} alt="profile pic" />
        </div>
        <h1>User Name</h1>
      </div>

      <div className="rc-profile-right">
        <StarRatings
          rating={props.review.rating}
          starRatedColor="yellow"
          starDimension="30px"
          starSpacing="10px"
        />
        <div className="rc-topic-text">
          <h1>{props.review.topic}</h1>
          <h2>{props.review.text}</h2>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
