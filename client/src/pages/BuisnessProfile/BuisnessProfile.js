import React, { useState, useEffect } from 'react'
import BusinessCard from '../../components/BuisnessCard'
import ReviewCard from '../../components/ReviewCard'
import API from '../../utils/API'
import Nav from '../../components/Nav'
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
    business: {},
    text: '',
    rating: '',
    username: '',
    reviews: []
  })

  // HANDLING the inputs on the page.
  businessState.handleInputChange = event => {
    setBusinessState({ ...businessState, [event.target.name]: event.target.value })  
  }


  useEffect(() => {

    // let businessId = 
    let dataComeback
    API.getUser()
        .then(({data}) => {
          dataComeback = data[0].Buisness
          console.log(dataComeback)
          API.findBusinessReviews(dataComeback._id)
            .then(({data:reviews}) => {
              console.log(data)
              setBusinessState({
                ...businessState,
                name: dataComeback.name,
                bio: dataComeback.bio,
                img: dataComeback.img,
                instagram: dataComeback.instagram,
                website: dataComeback.website,
                facebook: dataComeback.facebook,
                fee: dataComeback.fee,
                business: dataComeback,
                username: data[0].username,
                reviews
              })
            })
            .catch(err => console.log(err))

        })
        .catch(err => console.log(err))

  },[])

  businessState.updateBusiness = () => {

    let id = businessState.business._id

    API.updateBusiness(id)
      .then(({data}) => {
        console.log(data)
        // setBusinessState({
        //   ...businessState,
        //   nam
        // })
      })
      .catch(err => console.log(err))
  }



  return (
    <>
      <h1>Welcome to {businessState.name}</h1>
      <BusinessCard
        business={businessState.business}
      />

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
            <h2>Name: {businessState.business.name}</h2>
            <h2>Location: LA</h2>
            <h2>Fee: ${businessState.business.fee}/hr</h2>
            <h2>Service: {businessState.business.bio}</h2>
          </div>
        </div>

        <div className="bpp-business-review">
          {
            businessState.reviews.length > 0 ? (
              businessState.reviews.map(review => (
                <ReviewCard
                  key={businessState.business._id}
                  review={review}
                  business={businessState.business}
                  username={businessState.username}
                />
              ))
            ) : null
          }
        </div>
        <form action="">
          <label htmlFor="name">Change Name</label>
          <input type="text" name="name" onChange={businessState.handleInputChange}/>
          <label htmlFor="bio">Change Bio</label>
          <textarea name="bio" cols="30" rows="10" onChange={businessState.handleInputChange}></textarea>
          <label htmlFor="">Change Fee</label>
          <input type="text" name="fee" onChange={businessState.handleInputChange}/>
        </form>
        <button onClick={businessState.updateBusiness}>Submit</button>


      </div>
    </>
  )
}

export default BuisnessProfile
