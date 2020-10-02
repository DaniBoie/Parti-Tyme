import React, { useState, useEffect } from "react";
import BusinessCard from "../../components/BuisnessCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { Carousel } from "react-responsive-carousel";
import API from "../../utils/API";
import Nav from "../../components/Nav";
// Importing image
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import ExampleImage1 from "../../components/assets/images/business-1.jpg";
import ExampleImage2 from "../../components/assets/images/business-2.jpg";
import ExampleImage3 from "../../components/assets/images/business-3.jpg";
import ExampleImage4 from "../../components/assets/images/business-4.jpg";
import Logo from "../../components/assets/images/logos.png";
// Importing styling element
import "./BuisnessProfile.css";



const BuisnessProfile = () => {

  const [inputState, setInputState] = useState({
    disabled: true,
    show: "",
    hideButton: "hide",
  })

  inputState.handleEditButton = () => {
    setInputState({
      ...inputState,
      disabled: false,
      show: "show",
      hideButton: "",
    })
  }

  inputState.handleCancelButton = () => {
    setInputState({
      ...inputState,
      disabled: true,
      show: "",
      hideButton: "hide",
    })
  }

  inputState.handleSaveButton = () => {
    setInputState({
      ...inputState,
      disabled: true,
      show: "",
      hideButton: "hide",
    })
  }

  const [businessState, setBusinessState] = useState({
    name: "",
    bio: "",
    img: "",
    instagram: "",
    website: "",
    facebook: "",
    business_type: '',
    fee: "",
    business: {},
    text: "",
    rating: "",
    username: "",
    reviews: [],
  });

  // HANDLING the inputs on the page.
  businessState.handleInputChange = event => {
    setBusinessState({ 
      ...businessState, 
      [event.target.name]: event.target.value })

    console.log(businessState.bio)
  }

  useEffect(() => {

    let dataComeback
    API.getUser()
      .then(({ data }) => {
        dataComeback = data[0].Buisness
        // console.log(dataComeback)
        API.findBusinessReviews(dataComeback._id)
          .then(({ data: reviews }) => {
            // console.log(data)
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

  }, [])

  businessState.updateBusiness = () => {
    console.log(businessState.business)
    // let id = businessState.business._id   

    API.updateBusiness({
      name: businessState.name,
      bio: businessState.bio,
      img: businessState.img,
      instagram: businessState.instagram,
      website: businessState.facebook,
      business_type: businessState.business_type,
      fee: businessState.fee
    })
      .then(({ data }) => {
        console.log(data)
        // setBusinessState({
        //   ...businessState,
        //   nam
        // })
      })
      .catch(err => console.log(err))

    const handleSaveButton = () => {
      setInputState({
        ...inputState,
        disabled: true,
        show: "",
        hideButton: "hide",
      })
    }

    handleSaveButton()
  }

 var business = {
img:'https://www.visitnewportbeach.com/wp-content/uploads/2018/04/MastrosOceanClub-3-06-700x400.jpg',
name: 'Mastros',
descprition: 'kkkk idkkdkdkd'
 }

  return (
    <>
      <h1>Welcome to {businessState.name}</h1>
      <BusinessCard
        business={business}
      />
      {businessState.reviews.length > 0
        ? businessState.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        : null}

      <div className="business-profile-page">
        <Carousel className="bpp-business-carousel">
          <img src={ExampleImage1} />
          <img src={ExampleImage2} />
          <img src={ExampleImage3} />
          <img src={ExampleImage4} />
        </Carousel>

        <div className="bpp-business-information">
          <div className="bpp-business-info-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="bpp-business-info-area">

            <button
              className="bpp-edit-button"
              disabled={false}
              onClick={inputState.handleEditButton}
            >
              <i class="fas fa-edit"></i>
            </button>

            <label>
              <input
                className={`bpp-input-for-business-name ${inputState.show}`}
                type="text"
                name="name"
                defaultValue={businessState.name}
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
              />
            </label>
            <label>
              Location: LA

              <input
                className={`${inputState.show}`}
                type="text"
                name="businessLocation"
                defaultValue="LA"
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
              />
            </label>
            <label>
              Fee:
              <input
                className={`${inputState.show}`}
                type="text"
                name="fee"
                defaultValue="$13/hr, $5/order"
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
              />
            </label>
            <label>
              Service:{" "}
              <input
                className={`${inputState.show}`}
                type="text"
                name="businessService"
                defaultValue="Free Delivery with in 3 miles"
                disabled={inputState.disabled}
              />
            </label>
            <label>
              <textarea
                className={`${inputState.show}`}
                name="bio"
                rows="7"
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
                value={businessState.bio}
              >
                
              </textarea>
            </label>

            <button 
              className={`bpp-save-button ${inputState.hideButton}`}
              onClick={businessState.updateBusiness}

              >
              Save
            </button>
            <button
              className={`bpp-cancel-button ${inputState.hideButton}`}
              onClick={inputState.handleCancelButton}
            >
              Cancel
            </button>
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
              )))
            : null}
          
        </div>

        <form action="">
          <label htmlFor="name">Change Name</label>
          <input
            type="text"
            name="name"
            onChange={businessState.handleInputChange}
          />
          <label htmlFor="bio">Change Bio</label>
          <textarea
            name="bio"
            cols="30"
            rows="10"
            onChange={businessState.handleInputChange}
          ></textarea>
          <label htmlFor="">Change Fee</label>
          <input
            type="text"
            name="fee"
            onChange={businessState.handleInputChange}
          />
        </form>
        <button onClick={businessState.updateBusiness}>Submit</button>
      </div>
    </>
  );
};

export default BuisnessProfile;
