import React, { useState, useEffect } from "react";
import axios from "axios";
// import BusinessCard from "../../components/BuisnessCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { Carousel } from "react-responsive-carousel";
import Nav from "../../components/Nav";
// Importing image
// import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
// import Example1 from "../../components/assets/images/business-1.jpg";
// import Example2 from "../../components/assets/images/business-2.jpg";
// import Example3 from "../../components/assets/images/business-3.jpg";
// import Example4 from "../../components/assets/images/business-4.jpg";
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
    disabledIfOwner: false,
    blurHeart: "",
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
    carouselImg: "",
    changeImg: "",
    createdReviews: [],
  });

  businessState.changeRating = (newRating, rating) => {
    setBusinessState({
      ...businessState,
      rating: newRating,
    });
  };

  const clearReview = () => {
    setBusinessState({
      ...businessState,
      topic: "",
      text: "",
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

    axios
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      })
      .then(({ data }) => {
        let userBusinessId = data[0].Buisness._id || "";
        console.log(userBusinessId);

        if (userBusinessId === businessId) {
          setInputState({
            ...inputState,
            hideEdit: "",
            disabledIfOwner: true,
            blurHeart: "blur",
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
          carouselImg: data.img || '',
          logo: data.logo
        });
      })
      .catch((error) => console.log(error));
  }, []);

  businessState.updateBusiness = () => {
    console.log(businessState.business);

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

    axios
      .put("/api/buisness", updateObject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
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
      .then(({ data }) => {
        setBusinessState({ ...businessState, topic: "", text: "", rating: 0 });
        console.log("added", data);
        let newArray = businessState.createdReviews;
        newArray.push(data);
        setBusinessState({ ...businessState, createdReviews: newArray });
        clearReview();
      })
      .catch((err) => console.log(err));

    let businessId = localStorage.getItem("pickBusiness");

    let result;
    axios
      .get(`/api/review/buisness/${businessId}`)
      .then(({ data }) => {
        console.log(data);
        let denominator;
        if (data.length === 0) {
          denominator = 1;
        } else {
          denominator = data.length;
        }

        let sum = 0;
        data.forEach((review) => {
          sum = sum + review.rating;
        });

        result = sum / denominator;

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

        let favId = data[0].favorite.every((id) => {
          return id._id !== businessId;
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
    alert("Added To Favorite List!");
  };

  // const carouselBtn = () => {
  //   if (businessState.changeImg.length > 0) {
  //     axios
  //       .put(
  //         `api/buisness`,
  //         {
  //           img: businessState.changeImg,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("user")}`,
  //           },
  //         }
  //       )
  //       .then((data) => {
  //         setBusinessState({
  //           ...businessState,
  //           carouselImg: businessState.changeImg,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   console.log(businessState.carouselImg);
  // };

  return (
    <>
      <Nav />

      <div className="business-profile-page">
        <Carousel className="bpp-business-carousel">
          <img src={businessState.carouselImg} alt="Business 1" />
        </Carousel>

        {/* <div className="bpp-carousel-button">
          <button onClick={carouselBtn}>
            <i class="far fa-images"></i> Change Business Image
          </button>
          <input
            type="text"
            name="changeImg"
            placeholder="Input Image URL here..."
            onChange={businessState.handleInputChange}
          />
        </div> */}
        <div className="bpp-business-information">
          <div className="bpp-business-info-logo">
            <button
              className={`bpp-favorite-button ${inputState.blurHeart}`}
              onClick={btn}
              disabled={inputState.disabledIfOwner}
            >
              <i class="fas fa-heart"></i>
            </button>
            <img src={businessState.logo || Logo} alt="Logo" />

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
          </div>

          <div className="bpp-business-info-area">
            <button
              className={`bpp-edit-button ${inputState.hideEdit}`}
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
            {businessState.createdReviews.length > 0
              ? businessState.createdReviews.map((review) => (
                <ReviewCard
                  key={businessState.business._id}
                  review={review}
                  image={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAABgYGBpaWmtra2hoaH7+/vMzMzm5uY6OjrFxcXS0tJMTEzt7e3q6uri4uIQEBBYWFjz8/O9vb1TU1MaGhp7e3u3t7eUlJSNjY2np6fc3NyGhoYzMzM/Pz+bm5tycnImJiYoKCg1NTUVFRWIiIifPXEAAAAE6ElEQVR4nO2b61bqMBBGHS7ljshVRBQU3/8VjyK5NPna9ChJXKxv/7M1WbNpkkmGcndHCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQsgP2Mpz7hDiMl/JKHcMcVnIS5E7hri05DV3CHGZiNznjiEur9LKHUJkVrLIHUJcRnKc544hLgdZ5w4hLoXcejLsyEvuECIzlqfcIWB2ozO/70fkj64zLTlTuRkpFIF+tigZ7l7GZ6a/DPJXtL8Nq1aJzuV2KJkXexn6V9eXxt3fx/lzlOEMj7GmhkMR/+L8eGk8zrkhb9crNDVsy6N/caEay+4Kkf4UbYinYkPD6Uz6/tWW7jvnwdgYSg/cbmj4JEv/Yt90vco4TC3D48S/3cywGEvHv/pqukbLUCosQ3nwbzcz3MGFam913b5WvP+PbQhWi2aGH3LwL47sniXfMC0Z+lmxkWFxQul0XeoZjOJElA29nVcjQ1iBKsodD64a9f/gGLpLYiNDWIHqlDvOV8JxDN2p2MRwIigZvtR3nA7X0FnXmxh20SJ87/Z7vHLgjfEMV6WDQBNDWIHaqnYD/NGlwzMsP5AGhiNZgWR4vLTrdFUPhytH3hRtuJ6hGdPAcI0qUEPVbjrVgyPTCVkbdsxJwBpPYUNcgVKb7r215GxixB9GG3atFG02qGHDzZeFS18NiO3XQoSGfzosw0J/2qZqFjaEFagn1WxkHzHypETL0Frht+p20BBXoMaXVsevvc5S9ZHnmynb8HPEuVMxaPgIK1Cq1XkN0g80z7eLJUMzFU+XrBgyLN5RnnsufVBmmGYpipcN797Vn+Pv2yHDnsz8i/M31ep7yXpQf2YpZjiG5vP+noohw7aZsoah00h3MssxTB1Dqz62KAWHDadwgTQ5Vv+X3WdiXEMzh2ZfB4aAIaxAGSFlr4tuOYoZnmGhVvrzVKw3xBWort3BGbNGZ9i5eYZWVnwOGe5kBupzugKlN7hTvefN8P2Ub2h94ouAYaACZSrdepiCHV5sgKGZijKvNSxOqIqsc+rbff/CVCf9DDs3ZHinT63jWsOhDMDyL7WA5BIZaDjRAencjQxbqPiykVrABiEy0NDkbA0wnMMxN/aalklezMCGn2tI2PAVnfj6bkOX5CmxwrBwHwUwfEOn9seQIcovUakwNKf0SsMR3GbuXSOP1MWMKkNrg1phCCtQvaAg2udFpdLQmYqeYTFDxz1TnHzqlNiYL4QTp8Rqw/Kq6BluUBV7cqp8Umark7i+X2M4qTWEFSjzdYx/TtKpNXExo8awlBVdQ1yB0kUnsAiZVTZtMaPO0J6KruEjSmy6AoU2Z+bMkvYtzVpDayo6hsUAbU62+t/RCzT6Aaet79cbmoOdY9hDL5AUeqrBjGAOGEmLGfWGXlFJcZCPmn/G39qb6kbSN94Dhnp9KAc1h+NQ93XCOzOTElPu3Nb7wZm3qpcllsiwg8ahyS4VS4l5xn/qlyfT1sMny3Ixd4nG4WTYu1DxiAp1v/fn3wi/T39CSMxWDrlDiMwMvsd4Qwzl/eZ/hZft9Z804ArULdFNfkxPzT7XeyOpGOV8HTYJsAJ1S9z+T9I3ssodQmQ+Hm58nSGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQggh1+UfFKcouk0afC0AAAAASUVORK5CYII="}
                  business={businessState.business}
                  username={review.user.username}
                />
              ))
              : null}
            {businessState.reviews.length > 0
              ? businessState.reviews.map((review) => (
                  <ReviewCard
                    key={businessState.business._id}
                    review={review}
                    image={review.user.Settings.img}
                    business={businessState.business}
                    username={review.user.username}
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
                  disabled={inputState.disabledIfOwner}
                  onChange={businessState.handleInputChange}
                />
                <textarea
                  rows="4"
                  name="text"
                  placeholder="Write A Comment..."
                  disabled={inputState.disabledIfOwner}
                  onChange={businessState.handleInputChange}
                ></textarea>
              </form>
            </div>
            <button
              onClick={reviewSendButton}
              disabled={inputState.disabledIfOwner}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuisnessProfile;
