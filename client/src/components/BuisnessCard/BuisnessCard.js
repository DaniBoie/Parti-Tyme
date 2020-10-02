import React from 'react'
import './BusinessCard.css'
import StarRating from '../StarRating/StarRating.js'
import Logos from '../assets/images/logos.png'
import { FaFacebookF, FaInstagram, FaPortrait } from 'react-icons/fa'

const BuisnessCard = (props) => {
  return (
    <div className='Profile-Card'>

      <div className='header'>
        <img className='profile-image' src={props.business.img} alt='profile pic' />
        <div className='title'>{props.business.name}</div>
      </div>

      <div className='profile-main'>
        <a href='#' className='contact-btn'>Parti Tyme</a>
        <div className='desc'>{props.business.descprition}
        </div>
        <div className='buttons'>
          <ul>
            <li className='icon'><a href={props.business.facebook}><FaFacebookF size='1.4em' color='#3b5998' /></a></li>
            <li><a href={props.business.instagram}><FaInstagram size='1.4em' color='#bc2a8d' /></a></li>
            <li><a href={props.business.website}><FaPortrait size='1.4em' color='rgb(192, 70, 70)' /></a></li>
          </ul>
        </div>

        <div className='Stars'><StarRating /></div>
      </div>

    </div>
  );
};

export default BuisnessCard;
