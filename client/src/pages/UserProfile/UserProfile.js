import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import ProfileImage from "../../components/assets/images/no-profile-picture.jpg";
import API from "../../utils/API/API";
import Nav from "../../components/Nav";
import BusinessCard from "../../components/BuisnessCard"
import axios from "axios";

const UserProfile = () => {
  // Function to show / hide input area when click on "Edit Profile" Button
  const [showInput, setShowInput] = useState({
    show: "",
  });
  function editProfileBtn() {
    if (showInput.show === "")
      setShowInput({ ...showInput, show: "profile-input-show" });
    else setShowInput({ ...showInput, show: "" });
  }
  function handleCancelButton() {
    setShowInput({ ...showInput, show: "" });
  }

  const [userState, setUserState] = useState({
    realname: "",
    username: "",
    email: "",
    account_type: "",
    Reviews: [],
    Buisness: {},
    Settings: {},
    user: [],
    favorite: [],
    profileImg: "",
    bioChange: "",
    location: "",
    instaChange: "",
    facebookChange: "",
    selectValue: "",
    businessName: "",
    businessSlogan: "",
    businessBio: "",
    businessImage: "",
    businessLogo: "",
    businessFee: 0,
    businessLocation: "",
  });

  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    let dataComeback = "";
    API.getUser()
      .then(({ data }) => {
        dataComeback = data[0];
        console.log(dataComeback);

        setUserState({
          ...userState,
          realname: dataComeback.realname,
          username: dataComeback.username,
          email: dataComeback.email,
          account_type: dataComeback.account_type,
          Reviews: dataComeback.Reviews || [],
          Buisness: dataComeback.Buisness,
          Settings: dataComeback.Settings || {},
          favorite: dataComeback.favorite,
        });

        // Checking if the user has a business, if yes, hide the update account button
        if (dataComeback.Buisness) {
          setFormState({ ...formState, businessBtn: "hide" });
        }

        console.log("API DATA ON STARTUP", dataComeback);
      })
      .catch((err) => {
        window.location = "/businessview";
        console.log(err);
      });
    
  }, []);

  // Save Button
  const handleSaveBtn = () => {
    let settings = {};

    if (userState.profileImg.length > 0) {
      settings.img = userState.profileImg
    }
    if (userState.bioChange.length > 0) {
      settings.bio = userState.bioChange
    }
    if (userState.location.length > 0) {
      settings.location = userState.location
    }
    if (userState.instaChange.length > 0) {
      settings.instagram = userState.instaChange
    }
    if (userState.facebookChange.length > 0) {
      settings.facebook = userState.facebookChange
    }

    let userSettings;

    API.getUser()
      .then(({ data }) => {
        let dataComeback = data[0];

        setUserState({ ...userState, Settings: dataComeback.Settings });
        console.log("API SETTINGS ON SAVE BTN", dataComeback);
        userSettings = dataComeback.Settings;

        console.log("Inputted Settings ", userSettings);
        if (userSettings !== undefined) {
          API.updateSettings(settings)
            .then((data) => console.log("UPDATED SETTINGS", data))
            .catch((err) => console.log(err));
        } else {
          API.createSettings(settings)
            .then((data) => {
              console.log("Created Settings", data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  // Function to Hide and Show Business Form
  const [formState, setFormState] = useState({ show: "show", businessBtn: "" });

  // Update Account Button, to make the form appear
  const handleUpdateAccountButton = () => {
    setFormState({ ...formState, show: "" });
  };

  // X Button, to make the form disappear
  const handleXbutton = () => {
    setFormState({ ...formState, show: "show" });
  };

  // Submit Button / Writing New Data into database
  const handleBusinessButton = () => {
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


  return (
    <>
      <Nav name="User Profile" />
      <div className="user-profile-page">
        {/* Left Column / changing basic info area */}
        <div className="changing-basic-info-area">
          <img
            className="profile-image"
            src={
              userState.Settings.img !== "" ? (userState.Settings.img) : (ProfileImage)
            }
            alt="Profile Image"
          />
          <h1>{userState.realname}</h1>
          <p>{userState.Settings.location}</p>
          <p>
            Bio: {userState.Settings.bio}
          </p>
          <div className="profile-icons-list">
            <a
              href="https://www.google.com/"
              className="profile-icons"
              aria-label="Facebook"
              data-balloon-pos="left"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
            <a
              href="https://www.google.com/"
              className="profile-icons"
              aria-label="Instagram"
              data-balloon-pos="right"
            >
              <i class="fab fa-instagram-square"></i>
            </a>
          </div>

          <button
            className={`edit-profile-btn ${showInput.show}`}
            onClick={editProfileBtn}
          >
            Edit Profile
          </button>

          <ul className={`hide ${showInput.show}`}>
            <li>
              <label>
                <i class="fas fa-city"></i>
                <input
                  type="text"
                  name="location"
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
                  name="profileImg"
                  placeholder="Avatar url"
                  onChange={userState.handleInputChange}
                />
              </label>
            </li>

            <div className="profile-save-cancel-btn">
              <button className="profile-save-btn" onClick={handleSaveBtn}>
                Save
              </button>
              <button
                className="profile-cancel-btn"
                onClick={handleCancelButton}
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
            onClick={handleUpdateAccountButton}
          >
            Update Your Account <i class="fas fa-angle-double-up"></i>
          </button>

          <div className={`up-overlay-form ${formState.show}`}>
            <button className="up-x-button" onClick={handleXbutton}>
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
              {/* <button className="business-form-button" onClick={handleBusinessButton}>Submit</button> */}
              <a
                href="#"
                className="business-form-button"
                onClick={handleBusinessButton}
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

          <div className="changing-account-type-area">
            <h1>Welcome back {userState.username}</h1>
            <h3>{userState.email}</h3>
            <div>
              <h3>Favorites</h3>
                {
                  userState.favorite.length > 0 ? 
                    userState.favorite.map((business) => (
                      <BusinessCard
                        key={business._id}
                        business={business}
                      />
                    )) : null
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
