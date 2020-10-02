import React, { useState, useEffect } from 'react'
import BusinessCard from '../../components/BuisnessCard'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import API from '../../utils/API'

// Importing image
import Image from '../../components/assets/images/business-3.jpg'
import Logo from '../../components/assets/images/logos.png'

// Importing styling element
import './BuisnessProfile.css'

const BuisnessProfile = () => {

  const [businessState, setBusinessState] = useState({
    name: '',
    bio: '',
    img: '',
    instagram: '',
    website: '',
    facebook: '',
    fee: '',
    business: [],
    text: '',
    rating: '',
    username: '',
    reviews: []
  })

  // HANDLING the inputs on the page.
  businessState.handleInputChange = event => {
    setBusinessState({ ...businessState, [event.target.name]: event.target.value })
  }


  // useEffect(() => {


  //   let businessId = //?

  //     API.getOneBusiness(businessId)
  //       .then(({data}) => {
  //         let dataComeback = data
  //         console.log(dataComeback)
  //         setBusinessState({ 
  //           ...businessState, 
  //           name:dataComeback.name,
  //           bio:dataComeback.bio,
  //           img:dataComeback.img,
  //           instagram:dataComeback.instagram,
  //           website:dataComeback.website,
  //           facebook:dataComeback.facebook,
  //           fee:dataComeback.fee,
  //           reviews:dataComeback.reviews || []
  //         })
  //       })
        // .then(() => {        
        //   API.findBusinessReviews(businessId)
        //     .then(({data}) => {
        //       let reviews = data.reviews
        //       setBusinessState({ 
        //         ...businessState,
        //         text: reviews.text,
        //         rating: reviews.rating,
        //         username: reviews.user.username            
        //       })
        //     })
        //     .catch(err => console.log(err))
        // })
  //       .catch(err => console.log(err))
  // },[])

  return (
    <>
    <ReviewCard />
      <h1>Welcome to {businessState.name}</h1>
      <BusinessCard 
        business={businessState.business}    
      />
      {
        // businessState.reviews.length > 0 ? (
        //   businessState.reviews.map(review => (
        //     <Review
        //       key={review._id}
        //       review={review}
        //     />
        //   ))
        // ) : null
      }
      <div className="business-profile-page">
        {/* First Row / Business Carousel */}
        <div className="bpp-business-carousel">
          <img src={Image} alt="Example Image" />
        </div>

        {/* Middle Row / Business Information */}
        <div className="bpp-business-information">
          <div className="bpp-business-info-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="bpp-business-info-area">
            <h2>Name: Taco</h2>
            <h2>Location: LA</h2>
            <h2>Fee: $13/hr</h2>
            <h2>Service: Taco is da best</h2>
          </div>
        </div>

        {/* Bottom Row / Business Reviews */}
        <div className="bpp-business-review">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore expedita cum magnam odit maiores nulla, est odio commodi vero aperiam harum ex earum esse quaerat consequatur. Consectetur accusamus sit dolore!
        </div>
      </div>

    </>
  )
}

export default BuisnessProfile