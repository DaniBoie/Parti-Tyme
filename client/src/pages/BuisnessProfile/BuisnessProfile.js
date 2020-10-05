import React, { useState, useEffect } from "react";
import axios from "axios";
// import BusinessCard from "../../components/BuisnessCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
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
    hideEdit: "hide-edit",
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
    location: "",
    slogan: "",
    img: "",
    logo: "",
    instagram: "",
    website: "",
    facebook: "",
    business_type: "",
    fee: "",
    business: {},
    topic: "",
    text: "",
    rating: 0,
    averageRating: 0,
    reviews: [],
    username: "",
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
  };

  useEffect(() => {
    let businessId = localStorage.getItem("pickBusiness");

    API.getUser()
      .then(({ data }) => {
        let userBusinessId = data[0].Buisness._id || "";
        console.log(userBusinessId);

        if (userBusinessId === businessId) {
          setInputState({
            ...inputState,
            hideEdit: "",
          });
        } else {
          setInputState({
            ...inputState,
            hideEdit: "hide-edit",
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
        console.log(data);

        setBusinessState({
          ...businessState,
          business: data,
          reviews: data.reviews,
          averageRating: data.rating,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  businessState.updateBusiness = () => {
    console.log(businessState.business);
    // let id = businessState.business._id
    let updateObject = {};
    if (businessState.name.length > 0) {
      updateObject.name = businessState.name;
    }
    if (businessState.slogan.length > 0) {
      updateObject.slogan = businessState.slogan;
    }
    if (businessState.location.length > 0) {
      updateObject.location = businessState.location;
    }
    if (businessState.fee.length > 0) {
      updateObject.fee = businessState.fee;
    }
    if (businessState.bio.length > 0) {
      updateObject.bio = businessState.bio;
    }

    updateObject = {};

    if (businessState.name.length > 0) {
      updateObject.name = businessState.name;
    }
    if (businessState.slogan.length > 0) {
      updateObject.slogan = businessState.slogan;
    }
    if (businessState.location.length > 0) {
      updateObject.location = businessState.location;
    }
    if (businessState.fee.length > 0) {
      updateObject.fee = businessState.fee;
    }
    if (businessState.bio.length > 0) {
      updateObject.bio = businessState.bio;
    }

    API.updateBusiness(updateObject)
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
  const reviewSendButton = (event) => {
    event.preventDefault();

    axios
      .post(
        "/api/review",
        {
          topic: businessState.topic,
          text: businessState.text,
          rating: businessState.rating,
          buisness: localStorage.getItem("pickBusiness"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      )
      .then(() => {
        console.log("added");
      })
      .catch((err) => console.log(err));

    let businessId = localStorage.getItem("pickBusiness");

    let result;

    axios
      .get(`/api/review/buisness/${businessId}`)
      .then(({ data }) => {
        console.log(data);

        let sum = 0;
        data.forEach((review) => {
          sum = sum + review.rating;
        });

        result = sum / data.length;

        setBusinessState({
          ...businessState,
          averageRating: result,
        });

        axios
          .put(
            `/api/buisness/${businessId}`,
            {
              rating: result,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
              },
            }
          )
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const btn = () => {
    let businessId = localStorage.getItem("pickBusiness");

    axios
      .get(`/api/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      })
      .then(({ data }) => {
        let userId = data[0]._id;
        console.log(userId);

        const favId = data[0].favorite.every((id) => {
          return id !== businessId;
        });

        if (favId) {
          axios
            .put(
              `/api/buisness/users/${userId}`,
              {
                favorite: businessId,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("user")}`,
                },
              }
            )
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  // const addImg = () => {
  //   businessId = localStorage.getItem("pickBusiness")
  //   axios.put(`/buisness/image/${businessId}`,
  //   {
  //     img: businessState.img
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("user")}`,
  //     },
  //   })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err))
  // }

  return (
    <>
      <Nav />

      <div className="business-profile-page">
        <Carousel className="bpp-business-carousel">
          <img src={Example2} alt="Business 1" />
          <img src={Example2} alt="Business 2" />
          <img src={Example3} alt="Business 3" />
          <img src={Example4} alt="Business 4" />
        </Carousel>

        <div className="bpp-business-information">
          <div className="bpp-business-info-logo">
            <img src={businessState.business.logo} alt="Logo" />

            <div className="bpp-business-info-icons">
              <a
                href="https://www.google.com/"
                aria-label="Facebook"
                data-balloon-pos="left"
              >
                <i class="fab fa-facebook-square bpp-icons-facebook"></i>
              </a>
              <a
                href="https://www.google.com/"
                aria-label="Instagram"
                data-balloon-pos="right"
              >
                <i class="fab fa-instagram-square bpp-icons-instagram"></i>
              </a>
            </div>
            <StarRatings
              rating={businessState.averageRating}
              numberOfStars={5}
              starRatedColor="#fff200"
              starDimension="40px"
              starSpacing="5px"
            />

            <div className="bpp-heart-icons"></div>
            <button className={`bpp-favorite-button`} onClick={btn}>
              <i class="far fa-heart"></i>
            </button>
            {/* <button className={`bpp-favorite-button-liked`}>
              <i class="fas fa-heart"></i>
            </button> */}
          </div>

          <div className="bpp-business-info-area">
            <button
              className={`bpp-edit-button ${inputState.hideEdit}`}
              // disabled={inputState.disabled}

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
              Slogan:
              <input
                className={`${inputState.show}`}
                type="text"
                name="slogan"
                defaultValue={businessState.business.slogan}
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
            {/* <label>
              Add Images URL:
              <input
                className={`${inputState.show}`}
                type="text"
                name="img"
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
              />
            </label> */}
            <label>
              <textarea
                className={`${inputState.show}`}
                name="bio"
                rows="5"
                disabled={inputState.disabled}
                onChange={businessState.handleInputChange}
                defaultValue={businessState.business.bio}
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
              ? businessState.reviews.map((review) => (
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
            <div className="bpp-StarRatings">
              <StarRatings
                starHoverColor="yellow"
                starRatedColor="red"
                rating={businessState.rating}
                changeRating={businessState.changeRating}
                starDimension="30px"
                starSpacing="5px"
                name="rating"
                onChange={businessState.handleInputChange}
              />
            </div>
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
    </>
  );
};

export default BuisnessProfile;
