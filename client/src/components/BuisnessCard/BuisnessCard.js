import React from 'react'
import './BusinessCard.css'
import Logos from '../assets/logos.png'
import {} from @fortawes
// import Font from 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'

// import StarRatings from './react-star-ratings';

const BuisnessCard = () => {
  return (
    <div className='profile-card'>
      <div className='card-header'>
        <div className='pic'>
          <img src={Logos} alt='Portrait' />
        </div>
        <div className='name'>Banda CashMax</div>
        <div className='desc'>Authentic Mexican music for all your family to enjoy</div>
        <div className='stars'>
          <i className='fas fa-star' />
          <i className='fas fa-star' />
          <i className='fas fa-star' />
          <i className='fas fa-star' />
          <i className='fas fa-star' />
        </div>
        <a href='#' className='contact-btn'>Parti Tyme</a>
      </div>
      <div className='card-footer'>
        <div className='buttons'>
          <ul>
            <li><a href='#'><i className='fa fa-facebook' aria-hidden='true' /></a></li>
            <li><a href='#'><i className='fa fa-instagram' aria-hidden='true' /></a></li>
            <li><a href='#'><i className='fa fa-id-card-o' aria-hidden='true' /></a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BuisnessCard
