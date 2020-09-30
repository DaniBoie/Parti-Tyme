import React from 'react'
import './ReviewCard.css'
import Logos from '../assets/images/logos.png'
import StarRating from '../StarRating/StarRating'

const ReviewCard = () => {

  return (
    <div className='Review-Card'>

      <div className='profile-sidebar'>
        <div className='img'>
          <img className='profile-image' src={Logos} alt='profile pic' />
        </div>
        <h3 className='profile-name'>Karen</h3>
      </div>

      <div className='profile-main'>
        <div className='stars'><StarRating /></div>
        <p className='subject'>Loud Noises</p>
        <p className='profile-body'>
          Way to loud and did not provide a receipt at the end of the night.
          The manaer was rude and completly out of line.
        </p>
      </div>

    </div>
  )
}

export default ReviewCard
