import React, { useState, useEffect } from 'react'
import BusinessCard from '../../components/BuisnessCard'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import API from '../../utils/API'

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
    setBusinessState({ ...businessState, [event.target.name]: event.target.value})
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
    </>
  )
}

export default BuisnessProfile
