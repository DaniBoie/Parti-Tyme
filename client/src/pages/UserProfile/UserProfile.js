import React, { useState, useEffect } from "react";
import "./UserProfile.css";
// import ProfileImage from "../../components/assets/images/no-profile-picture.jpg";
import API from "../../utils/API/API";
import Nav from "../../components/Nav";
import BusinessCard from "../../components/BuisnessCard";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard";
import Logo from "../../components/assets/images/logos.png";

const UserProfile = () => {

  const [userState, setUserState] = useState({
    govName: "",
    img: "",
    Reviews: [],
    Buisness: {},
    favorite: [],
    profileImgChange: '', 
    userBio: "",
    userCity: "",
    bioChange: "",
    cityChange: "",
    instaChange: "",
    facebookChange: "",
  });

  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  userState.handleProfileBtn = () => {
    let accBtn = document.getElementById("updateAccUl")

    if (accBtn.style.display === "none") {
      accBtn.style.display = "flex";
    } else {
      accBtn.style.display = "none";
    }
  }

  userState.handleSaveBtn = () => {
    let settings = {};

    if (userState.profileImgChange.length > 0) {
      settings.img = userState.profileImgChange;
    }
    if (userState.bioChange.length > 0) {
      settings.bio = userState.bioChange;
    }
    if (userState.cityChange.length > 0) {
      settings.location = userState.cityChange;
    }
    if (userState.instaChange.length > 0) {
      settings.instagram = userState.instaChange;
    }
    if (userState.facebookChange.length > 0) {
      settings.facebook = userState.facebookChange;
    }

    API.updateSettings(settings)
      .then((data) => {
        console.log("UPDATED SETTINGS", data);
        axios
          .get("/api/users/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          })
          .then(({ data }) => {
            let dataComeback = data[0];

            setUserState({
              ...userState,
              img: dataComeback.img || Logo,
              userCity: dataComeback.location || "",
              userBio: dataComeback.bio || "",
              cityChange: "",
              bioChange: "",
              instaChange: "",
              facebookChange: "",
              profileImgChange: "",
            });
          })
          .catch((err) => console.log(err));

      })
  };

  
  const [businessState, setBusinessState] = useState ({
    businessName: "",
    businessSlogan: "",
    businessBio: "",
    businessImage: "",
    businessLogo: "",
    businessFee: 0,
    businessLocation: "",
  })

  businessState.handleInputChange = (event) => {
    setBusinessState({ ...businessState, [event.target.name]: event.target.value });
  };

  // Submit Button / Writing New Data into database
  businessState.handleBusinessButton = () => {
    API.createBusiness({
      name: userState.businessName,
      slogan: userState.businessSlogan,
      bio: userState.busiessBio,
      img: userState.businessImage,
      logo: userState.businessLogo,
      buisness_type: userState.selectValue,
      fee: userState.businessFee,
      location: userState.businessLocation,
    })
      .then((data) => {
        setFormState({ ...formState, show: "show", businessBtn: "hide" });
        console.log(data);
      })
      .catch((error) => console.log(error));
  };


  // Function to Hide and Show Business Form
  const [formState, setFormState] = useState({ show: "show", businessBtn: "" })

  // Update Account Button, to make the form appear
  formState.handleUpdateAccountButton = () => {
    setFormState({ ...formState, show: "" });
  };

  // X Button, to make the form disappear
  formState.handleXbutton = () => {
    setFormState({ ...formState, show: "show" });
  };

  // ON PAGE LOAD, GET USER DATA AND POPULATE PAGE:
  useEffect(() => {

    axios
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      })
      .then(({ data }) => {
        let dataComeback = data[0];
        console.log(dataComeback)
        setUserState({
          ...userState,
          Reviews: dataComeback.Reviews || [],
          Buisness: dataComeback.Buisness,
          favorite: dataComeback.favorite,
          govName: dataComeback.realname,
          img: dataComeback.img || Logo,
          userCity: dataComeback.location || "",
          userBio: dataComeback.bio || ""
        });

        // Checking if the user has a business, if yes, hide the update account button
        if (dataComeback.Buisness) {
          setFormState({ ...formState, businessBtn: "hide" });
        }

      })
      .catch((err) => {
        window.location = "/businessview";
        console.log(err);
      });
  }, []);


  return (
    <>
      <Nav name="User Profile" />
      <div className="user-profile-page">
        {/* Left Column / changing basic info area */}
        <div className="changing-basic-info-area">
          <img
            className="profile-image"
            src={
              userState.img
            }
            alt="Profile"
          />
          <h1>{userState.govName}</h1>
          <p>
            {userState.userCity}
          </p>
          <p>
            {userState.userBio}
          </p>
          <div className="profile-icons-list">
            <a
              href={userState.facebookChange}
              className="profile-icons"
              aria-label="Facebook"
              data-balloon-pos="left"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
            <a
              href={userState.instaChange}
              className="profile-icons"
              aria-label="Instagram"
              data-balloon-pos="right"
            >
              <i class="fab fa-instagram-square"></i>
            </a>
          </div>

          <button
            className={`edit-profile-btn`}
            onClick={userState.handleProfileBtn}
          >
            Edit Profile
          </button>
          {/* className={`hide ${showInput.show}` */}
          <ul id="updateAccUl" style={{ display: 'none'}}>
            <li>
              <label>
                <i class="fas fa-city"></i>
                <input
                  type="text"
                  name="cityChange"
                  placeholder="Change Your City ..."
                  onChange={userState.handleInputChange}
                />
              </label>
            </li>
            <li>
              <label>
                <i class="fas fa-id-card-alt"></i>
                <input
                  type="text"
                  name="bioChange"
                  placeholder="Change Your Bio ..."
                  onChange={userState.handleInputChange}
                />
              </label>
            </li>
            <li>
              <label>
                <i class="fab fa-instagram-square"></i>
                <input
                  type="text"
                  name="instaChange"
                  placeholder="Link Instagram..."
                  onChange={userState.handleInputChange}
                />
              </label>
            </li>
            <li>
              <label>
                <i class="fab fa-facebook-square"></i>
                <input
                  type="text"
                  name="facebookChange"
                  placeholder="Link Facebook ..."
                  onChange={userState.handleInputChange}
                />
              </label>
            </li>

            <li>
              <label>
                <i class="fas fa-camera"></i>
                <input
                  type="text"
                  name="profileImgChange"
                  placeholder="Avatar url"
                  onChange={userState.handleInputChange}
                />
              </label>
            </li>

            <div className="profile-save-cancel-btn">
              <button className="profile-save-btn" onClick={userState.handleSaveBtn}>
                Save
              </button>
              <button
                className="profile-cancel-btn"
                onClick={userState.handleProfileBtn}
              >
                Cancel
              </button>
            </div>
          </ul>
        </div>

        {/* Right Column */}
        <div className="changing-account-type-area">
          {/* Update Account Button */}
          <button
            className={`upp-update-account-btn ${formState.businessBtn}`}
            onClick={userState.handleUpdateAccountButton}
          >
            Update Your Account <i class="fas fa-angle-double-up"></i>
          </button>

          <div className={`up-overlay-form ${formState.show}`}>
            <button className="up-x-button" onClick={formState.handleXbutton}>
              <i class="fas fa-times"></i>
            </button>
            <h1>Business Registration Form </h1>
            <form className={`update-account-form ${formState.show}`}>
              <label>
                *Business Name:
                <input
                  type="text"
                  name="businessName"
                  onChange={userState.handleInputChange}
                />
              </label>
              <label>
                Business Slogan:
                <input
                  type="text"
                  name="businessSlogan"
                  onChange={userState.handleInputChange}
                />
              </label>
              <label>
                Business Bio:
                <input
                  type="text"
                  name="businessBio"
                  onChange={userState.handleInputChange}
                />
              </label>
              <label>
                Business Image (url):
                <input
                  type="text"
                  name="businessImage"
                  onChange={userState.handleInputChange}
                />
              </label>
              <label>
                Business Logo:
                <input
                  type="text"
                  name="businessLogo"
                  onChange={userState.handleInputChange}
                />
              </label>
              <label>
                *Business Type:
                <select
                  name="selectValue"
                  onChange={userState.handleInputChange}
                >
                  <option>Pick One</option>
                  <option value="Food">Food</option>
                  <option value="Music">Music</option>
                  <option value="Rentals">Rentals</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </label>
              <label>
                *Fee (Per Hour):
                <input
                  type="number"
                  name="businessFee"
                  onChange={userState.handleInputChange}
                />
              </label>
              <label>
                *Location:
                <input
                  type="text"
                  name="businessLocation"
                  onChange={userState.handleInputChange}
                />
              </label>
              <a
                href="/userprofile"
                className="business-form-button"
                onClick={businessState.handleBusinessButton}
              >
                {" "}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </a>
            </form>
          </div>

          {/* Right Column */}
          <div className="changing-account-type-area">
            <h1>Welcome back {userState.govName}</h1>

            <div className="up-right-col-main">
              <div className="up-reviewed-business-row">
                <h2 className="h2s">Saved Businesses:</h2>
                {userState.favorite.length > 0
                  ? userState.favorite.map((business) => (
                    <BusinessCard key={business._id} business={business} />
                  ))
                  : null}
              </div>
              <div className="up-review-row">
                <h2 className="h2s">Reviews Written:</h2>
                {userState.Reviews.length > 0
                  ? userState.Reviews.map((review) => (
                      <ReviewCard
                        key={review.buisness._id}
                        review={review}
                        image={review.buisness.logo ||Logo}
                        username={review.buisness.name}
                      />
                    ))
                  : null}
              </div>

            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
