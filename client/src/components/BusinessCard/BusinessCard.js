import React from 'react';
import './BusinessCard.css';
import SimpleRating from '../StarRating';


const BusinessCard = () => {
  return (
    <div className="card">
    <div className="card-image"></div>
    <div className="card-text">
      <span className="date">4 days ago</span>
      <h2>Post One</h2>
      <p>Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor</p>
      <SimpleRating />
      <div>
    </div>
    </div>
    
    <div className="card-stats">
      <div className="stat">
      <a href= "https://www.instagram.com"><i className="fab fa-instagram"></i></a>
        
      </div>
      <div className="stat border">
        <a href= "www.instagram.com"><i className="fab fa-facebook-f"></i></a>
      </div>
      <div className="stat">
        <a href= "www.instagram.com"><i className="fab fa-yelp"></i></a>
      </div>
    </div>
  </div>
)
}

export default BusinessCard