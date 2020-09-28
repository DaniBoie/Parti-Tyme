import React from 'react'
import './BusinessCard.css'
import Logos from '../assets/logos.png'
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
            <li><a href='#'><FaFacebookF /></a></li>
            <li><a href='#'><FaInstagram /></a></li>
            <li><a href='#'><FaPortrait /></a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BuisnessCard
