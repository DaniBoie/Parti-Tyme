import React from 'react'
import './ReviewCard.css'
import Logos from '../assets/images/logos.png'
import StarRating from '../StarRating/StarRating'

const ReviewCard = props => {

  return (
    <div className='Review-Card'>

      <div className='profile-sidebar'>
        <div className='img'>
          <img className='profile-image' src={Logos} alt='profile pic' />
        </div>
        <h3 className='profile-name'>{props.username}</h3>
      </div>

      <div className='profile-main'>
        <div className='stars'><StarRating review={props.review.rating}/></div>
        <p className='subject'>{props.business.name}</p>
        <p className='profile-body'>
          {props.review.text}
        </p>
      </div>

    </div>
  )
}

export default ReviewCard
