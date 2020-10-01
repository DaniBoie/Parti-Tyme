import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import ProfileImage from "../../components/assets/images/business-2.jpg";
import API from "../../utils/API/API";
import Nav from "../../components/Nav";
const UserProfile = () => {
  // Function to show / hide input area when click on "Edit Profile" Button
  const [showInput, setShowInput] = useState({
    show: "",
  });

  function editProfileBtn() {
    if (showInput.show === "") setShowInput({ show: "profile-input-show" });
    else setShowInput({ show: "" });
  }

  const [userState, setUserState] = useState({
    realname: "",
    username: "",
    email: "",
    account_type: "",
    Reviews: [],
    Buisness: "",
    Settings: {},
    user: [],
    profileImg: "",
    bioChange: "",
    instaChange: "",
    facebookChange: "",
  });

  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    API.getUser()
      .then(({ data }) => {
        let dataComeback = data[0];

        setUserState({
          ...userState,
          realname: dataComeback.realname,
          username: dataComeback.username,
          email: dataComeback.email,
          account_type: dataComeback.account_type,
          Reviews: dataComeback.Reviews || [],
          Buisness: dataComeback.Buisness,
          Settings: dataComeback.Settings || {},
        });

        console.log("API DATA ON STARTUP", dataComeback);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSaveBtn = () => {
    let settings = {
      img: userState.profileImg,
      bio: userState.bioChange,
      instagram: userState.instaChange,
      facebook: userState.facebookChange,
    };
    let userSettings;

    API.getUser()
      .then(({ data }) => {
        let dataComeback = data[0];

        setUserState({ ...userState, Settings: dataComeback.Settings });
        console.log("API SETTINGS ON SAVE BTN", dataComeback);
        userSettings = dataComeback.Settings;

        console.log("Inputted Settings ", settings);
        if (userSettings === (undefined || null)) {
          API.createSettings(settings)
            .then((data) => {
              console.log("Created Settings", data);
            })
            .catch((err) => console.log(err));
        } else {
          API.updateSettings(settings)
            .then((data) => console.log("UPDATED SETTINGS", data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateBtn = () => {
    console.log(userState);
  };

  return (
    <>
      <Nav name="User Profile" />
      <div className="user-profile-page">
        {/* Left Column / changing basic info area */}
        <div className="changing-basic-info-area">
          <img
            className="profile-image"
            src={ProfileImage}
            alt="Profile Image"
          />
          <h1>{userState.realname}</h1>
          <p>City Of The User</p>
          <p>
            Bio: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
            assumenda vitae tempore doloremque quos ducimus neque quas commodi
            officiis et?
          </p>

          {/* <button className={`update-account-btn`} onclick={handleUpdateBtn}>Update Your Account</button> */}

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
                  type="submit"
                  name="profileImg"
                  value="Change Profile Picture"
                  onChange={userState.handleInputChange}
                />
              </label>
            </li>

            <div className="profile-save-cancel-btn">
              <button className="profile-save-btn" onClick={handleSaveBtn}>
                Save
              </button>
              <button className="profile-cancel-btn">Cancel</button>
            </div>
          </ul>
        </div>

        {/* Right Column */}
        <div className="changing-account-type-area">
          <button className="upp-update-account-btn">
            Update Your Account <i class="fas fa-angle-double-up"></i>
          </button>

          <h1>Welcome back {userState.username}</h1>
          <h3>{userState.email}</h3>
          <div>
            <h3>Reviews</h3>
            {userState.Reviews.length > 0
              ? userState.Reviews.map((review) => (
                  <div key={review._id}>
                    <h4>{review.buisness.name}</h4>
                    <p>{review.rating}</p>
                    <p>{review.rating}</p>
                  </div>
                ))
              : null}
          </div>
          <div>
            <label>
              <i class="fas fa-camera"></i>
              <input
                type="submit"
                ame="buisness"
                onChange={userState.handleInputChange}
              />
              <input
                type="submit"
                name="rating"
                onChange={userState.handleInputChange}
              />
              <input
                type="submit"
                name="text"
                onChange={userState.handleInputChange}
              />
            </label>
            <button onClick={userState.handleClickBtn}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
