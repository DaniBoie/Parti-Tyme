import React from 'react'
import './ReviewCard.css'
import Logos from '../assets/images/logos.png'
// import StarRating from '../StarRating/StarRating'
import StarRatings from 'react-star-ratings'

const ReviewCard = props => {

  return (
    <div className='Review-Card'>

      <div className='profile-sidebar'>
        <img className='profile-image' src={Logos} alt='profile pic' />
        <h3 className='profile-name'>{props.username}</h3>
      </div>

      <div className='profile-main'>
        <div className='stars'>          
          <StarRatings
            rating= {props.review.rating / 2}
            starRatedColor="yellow"
            starDimension="40px"
            starSpacing="15px"
          />
        </div>
        <div className='subject'>{props.business.name}</div>
        <div className='content'>
          {props.review.text}
        </div>
      </div>

    </div>
  )
}

export default ReviewCard
