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
  const [businessState, setBusinessState] = useState({
    name: "",
    bio: "",
    img: "",
    instagram: "",
    website: "",
    facebook: "",
    fee: "",
    business: {},
    text: "",
    rating: "",
    username: "",
    reviews: [],
  });

  // HANDLING the inputs on the page.
  businessState.handleInputChange = (event) => {
    setBusinessState({
      ...businessState,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    // let businessId =

    API.getUser()
      .then(({ data }) => {
        console.log(data);
        let dataComeback = data[0].Buisness;

        setBusinessState({
          ...businessState,
          name: dataComeback.name,
          bio: dataComeback.bio,
          img: dataComeback.img,
          instagram: dataComeback.instagram,
          website: dataComeback.website,
          facebook: dataComeback.facebook,
          fee: dataComeback.fee,
          reviews: dataComeback.reviews || [],
          business: dataComeback,
        });

        console.log(dataComeback);
      })
      .catch((err) => console.log(err));
  }, []);

  const btn = () => {
    console.log(businessState);
  };

  // Function for enable Edit button
  const [inputState, setInputState] = useState({
    disabled: true,
    show: "",
    hideButton: "hide",
  });

  inputState.handleEditButton = () => {
    setInputState({
      ...inputState,
      disabled: false,
      show: "show",
      hideButton: "",
    });
  };

  // When the save button is clicked, set the input back to disable, also write the new data into database, and display it
  // inputState.handleSaveButton = () => {
  //   setInputState({
  //     ...inputState,
  //     disabled: true,
  //     show: "",
  //     hideButton: "hide",
  //   });
  // }

  // When the cancel button is clicked, simply set the input back to disable.
  inputState.handleCancelButton = () => {
    setInputState({
      ...inputState,
      disabled: true,
      show: "",
      hideButton: "hide",
    });
  };
  return (
    <>
      {/* <h1>Welcome to {businessState.name}</h1>
      <BusinessCard
        business={businessState.business}
      />
      {businessState.reviews.length > 0
        ? businessState.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        : null} */}
      <Nav name="Business Profile" />
      <div className="business-profile-page">
        {/* First Row / Business Carousel */}
        {/* <div className="bpp-business-carousel"> */}
        {/* <img src={ExampleImage1} alt="Example Image" /> */}
        <Carousel className="bpp-business-carousel">
          <img src={ExampleImage1} />
          <img src={ExampleImage2} />
          <img src={ExampleImage3} />
          <img src={ExampleImage4} />
        </Carousel>
        {/* </div> */}

        {/* Middle Row / Business Information */}
        <div className="bpp-business-information">
          <div className="bpp-business-info-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="bpp-business-info-area">
            <button
              className="bpp-edit-button"
              onClick={inputState.handleEditButton}
            >
              <i class="fas fa-edit"></i>
            </button>

            <label>
              {/* Name:{" "} */}
              <input
                className={`bpp-input-for-business-name ${inputState.show}`}
                type="text"
                name="businessName"
                defaultValue="Taco Truck"
                disabled={inputState.disabled}
              />
            </label>
            <label>
              Location:{" "}
              <input
                className={`${inputState.show}`}
                type="text"
                name="businessLocation"
                defaultValue="LA"
                disabled={inputState.disabled}
              />
            </label>
            <label>
              Fee:{" "}
              <input
                className={`${inputState.show}`}
                type="text"
                name="businessFee"
                defaultValue="$13/hr, $5/order"
                disabled={inputState.disabled}
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
            <textarea
              className={`${inputState.show}`}
              name="businessBio"
              rows="7"
              disabled={inputState.disabled}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Inventore expedita cum magnam odit maiores nulla, est odio commodi
              vero aperiam harum ex earum esse quaerat consequatur. Consectetur
              accusamus sit dolore!Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Inventore expedita cum magnam odit maiores
              nulla, est odio commodi vero aperiam harum ex earum esse quaerat
              consequatur. Consectetur accusamus sit dolore!
            </textarea>

            <button className={`bpp-save-button ${inputState.hideButton}`}>
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

        {/* Bottom Row / Business Reviews */}
        <div className="bpp-business-review">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
          expedita cum magnam odit maiores nulla, est odio commodi vero aperiam
          harum ex earum esse quaerat consequatur. Consectetur accusamus sit
          dolore!
        </div>
      </div>
      {/* <button onClick={btn}>click</button> */}
    </>
  );
};

export default BuisnessProfile;
