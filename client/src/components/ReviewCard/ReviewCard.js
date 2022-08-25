import React from "react";
import "./ReviewCard.css";

import StarRatings from "react-star-ratings";
// import ExamplePic1 from "../assets/images/business-1.jpg";
const ReviewCard = (props) => {
  // console.log(props);
  return (
    <div className="Review-Card">
      <div className="rc-profile-left">
        <div className="rc-profile-image">
          <img src={props.image} alt="profile pic" />
        </div>
        <h1>{props.username}</h1>
      </div>
      <div className="rc-profile-right">
        <div className="rc-topic-text">
          <h1>{props.review.topic}</h1>
          <h2>{props.review.text}</h2>
        </div>
        <StarRatings
          rating={props.review.rating}
          starRatedColor="#ffa534"
          starEmptyColor="#636e72"
          numberOfStars={5}
          name="rating"
          starDimension="25px"
          starSpacing="3px"
          className="blockClass"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
