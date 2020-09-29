import React, { useState, useEffect } from 'react'
import BusinessCard from '../../components/BuisnessCard'
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
    reviews: [],
    business: []
  })

    // HANDLING the inputs on the page.
  businessState.handleInputChange = event => {
    setBusinessState({ ...businessState, [event.target.name]: event.target.value})
  }


  useEffect(() => {

    let businessId

      API.getOneBusiness(businessId)
        .then(({data}) => {
          let dataComeback = data
          console.log(dataComeback)
          setBusinessState({ ...businessState, name:dataComeback.name,
          bio:dataComeback.bio,
          img:dataComeback.img,
          instagram:dataComeback.instagram,
          website:dataComeback.website,
          facebook:dataComeback.facebook,
          fee:dataComeback.fee,
          reviews:dataComeback.reviews || []
          })
        })
        .catch(err => console.log(err))
  },[])

  return (
    <>
      <h1>Welcome to {businessState.name}</h1>
      <BusinessCard 
        business={businessState.business}    
      />
    </>
  )
}

export default BuisnessProfile
