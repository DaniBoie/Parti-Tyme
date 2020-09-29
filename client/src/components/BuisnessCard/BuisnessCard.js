import React from 'react'
import './BusinessCard.css'
import Logos from '../assets/images/logos.png'
import { FaFacebookF, FaInstagram, FaPortrait } from 'react-icons/fa'

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
            <li><a href='#'><FaFacebookF size='2em' color='#3b5998' /></a></li>
            <li><a href='#'><FaInstagram size='2em' color='#bc2a8d' /></a></li>
            <li><a href='#'><FaPortrait size='2em' color='rgb(192, 70, 70)' /></a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BuisnessCard
