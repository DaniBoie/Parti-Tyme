import React, { useState, useEffect } from "react";
import axios from "axios";
// import BusinessCard from "../../components/BuisnessCard";
// import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { Carousel } from "react-responsive-carousel";
import API from "../../utils/API";
import Nav from "../../components/Nav";
// Importing image
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import Example1 from "../../components/assets/images/business-1.jpg";
import Example2 from "../../components/assets/images/business-2.jpg";
import Example3 from "../../components/assets/images/business-3.jpg";
import Example4 from "../../components/assets/images/business-4.jpg";
import Logo from "../../components/assets/images/logos.png";
// Importing styling element
import "./BuisnessProfile.css";
import StarRatings from "react-star-ratings";

const BuisnessProfile = () => {
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

  inputState.handleCancelButton = () => {
    setInputState({
      ...inputState,
      disabled: true,
      show: "",
      hideButton: "hide",
    });
  };

  const [businessState, setBusinessState] = useState({
    name: "",
    bio: "",
    location:"",
    slogan: "",
    img: "",
    instagram: "",
    website: "",
    facebook: "",
    business_type: "",
    fee: "",
    business: {},
    topic: "",
    text: "",
    rating: 0,
    reviews: [],
    username: "",
    favorite: ""
  });

  businessState.changeRating = (newRating, rating) => {
    setBusinessState({
      ...businessState,
      rating: newRating,
    });
  };

  // HANDLING the inputs on the page.

  businessState.handleInputChange = (event) => {
    setBusinessState({
      ...businessState,
      [event.target.name]: event.target.value,
    });
    // console.log(businessState.rating)
    // console.log(businessState.topic);
  };

  let businessId;
  let userId;

  useEffect(() => {
    // let dataComeback;

    businessId = localStorage.getItem("pickBusiness");

    API.getUser()
      .then(({ data }) => {

        let userBusinessId = data[0].Buisness._id || "";
        console.log(userBusinessId);

        if (userBusinessId === businessId) {
          setInputState({
            ...inputState,
            disabled: false,
          });
        } else {
          setInputState({
            ...inputState,
            disabled: true,
          });
        }
      })
      .catch((err) => console.log(err));

    if (businessId === null) {
      window.location = "/businessview";
    }

    // Pulling data from database based on the ID
    axios
      .get(`/api/buisness/${businessId}`)
      .then(({ data }) => {
        // console.log(data);
        setBusinessState({ ...businessState, business: data,
        reviews: data.reviews });
      })
      .catch((error) => console.log(error));
  }, []);

  businessState.updateBusiness = () => {
    console.log(businessState.business);
    // let id = businessState.business._id

    API.updateBusiness({
      name: businessState.name,
      bio: businessState.bio,
      img: businessState.img,
      instagram: businessState.instagram,
      website: businessState.facebook,
      business_type: businessState.business_type,
      fee: businessState.fee,
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    const handleSaveButton = () => {
      setInputState({
        ...inputState,
        disabled: true,
        show: "",
        hideButton: "hide",
      });
    };

    handleSaveButton();
  };

  // Handle Send Button
  const reviewSendButton = event => {
    event.preventDefault()
    // console.log(businessState.topic);

    // businessId = localStorage.getItem("user")
    axios.post('/api/review', {
      topic: businessState.topic,
      text: businessState.text,
      rating: businessState.rating,
      buisness: localStorage.getItem('pickBusiness'),
    }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  // var business = {
  //   img:
  //     "https://www.visitnewportbeach.com/wp-content/uploads/2018/04/MastrosOceanClub-3-06-700x400.jpg",
  //   name: "Mastros",
  //   descprition: "kkkk idkkdkdkd",
  // };

  const btn = () => {
    console.log(businessState.business)
    businessId = localStorage.getItem("user")
    API.favaBusiness({
      favorite: businessId
    })
  }

  return (
    <>
      <Nav />

      <div className="business-profile-page">
        <Carousel className="bpp-business-carousel">
          <img src={Example1} alt="Business Picture" />
          <img src={Example2} alt="Business Picture" />
          <img src={Example3} alt="Business Picture" />
          <img src={Example4} alt="Business Picture" />
        </Carousel>

        <div className="bpp-business-information">
          <div className="bpp-business-info-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="bpp-business-info-area">
            <button
              className="bpp-edit-button"
              disabled={inputState.disabled}
              onClick={inputState.handleEditButton}
            >
              <i class="fas fa-edit"></i>
            </button>

            <label>
              <input
                className={`bpp-input-for-business-name ${inputState.show}`}
                type="text"
                name="name"
                defaultValue={businessState.business.name}
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
              />
            </label>
            <label>
              Location:
              <input
                className={`${inputState.show}`}
                type="text"
                name="location"
                defaultValue={businessState.business.location}
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
                defaultValue={businessState.business.fee}
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
              />
            </label>
            <label>
              Slogan:{" "}
              <input
                className={`${inputState.show}`}
                type="text"
                name="slogan"
                defaultValue="Free Delivery with in 3 miles"
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
              />
            </label>
            <label>
              <textarea
                className={`${inputState.show}`}
                name="bio"
                rows="7"
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
                value={businessState.business.bio}
              ></textarea>
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
          <div className="bpp-business-review-left">

            {businessState.reviews.length > 0
              ? businessState.reviews.map((review) =>  (
                  <ReviewCard
                    key={businessState.business._id}
                    review={review}
                    business={businessState.business}
                    username={businessState.business.username}
                  />
                ))
              : null}
          </div>

          <div className="bpp-business-review-right">
            {/* <div className="bpp-business-review-right-image">
              <img src={ExampleImage2} alt="profile picture" />
              <p>User Name</p>
            </div> */}
            <StarRatings
              className="bpp-StarRatings"
              starHoverColor="yellow"
              starRatedColor="red"
              rating={businessState.rating}
              changeRating={businessState.changeRating}
              starDimension="20px"
              starSpacing="5px"
              name="rating"
              onChange={businessState.handleInputChange}
            />
            <div className="bpp-business-review-right-topic">
              <form>
                <input
                  type="text"
                  name="topic"
                  placeholder="Topic..."
                  onChange={businessState.handleInputChange}
                />
                <textarea
                  rows="4"
                  name="text"
                  placeholder="Write Your Comment Here..."
                  onChange={businessState.handleInputChange}
                ></textarea>
              </form>
            </div>
            <button onClick={reviewSendButton}>Send</button>
          </div>
        </div>
      </div>
      <button 
        name="favorite"
       onClick={btn}
        onChange={businessState.handleInputChange}
      >submit</button>
    </>
  );
};

export default BuisnessProfile;
