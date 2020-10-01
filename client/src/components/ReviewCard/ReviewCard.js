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
        <div className='name'>
          <h3>Karen Sanderbee</h3>
        </div>
      </div>

      <div className='profile-main'>
        <div className='star'><StarRating /></div>
        <div href='#' className='business'>PlayTech</div>
        <div href='#' className='subject'>REFUND</div>
        <div href='#' className='content'>
        This was by far the worst customer experience I have ever had.
        I wasn't able to get my refund simply because I didn't have a
        receipt even though I am a frequent customer! Well you lost a
        customer for life now!
        </div>
      </div>

    </div>
  )
}

export default ReviewCard
