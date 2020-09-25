import React, { useState } from "react";

// Importing Css
import "./UserProfile.css";

// Importing Images
import ProfileImage from "../../components/images/business-2.jpg";

const UserProfile = () => {


  // Function to show / hide input area when click on "Edit Profile" Button
  const [showInput, setShowInput] = useState({
    show: "",
  });

  function editProfileBtn() {
    if (showInput.show === "") setShowInput({ show: "profile-input-show" });
    else setShowInput({ show: "" });
  }

  return (
    <div className="user-profile-page">
      {/* Left Column / Profile Basic Info */}
      <div className="changing-basic-info-area">
        <img className="profile-image" src={ProfileImage} alt="Profile Image" />
        <h1>User Full Name goes here</h1>
        <p>City Of The User</p>

        <button className={`update-account-btn`}>Update Your Account</button>

        <button
          className={`edit-profile-btn ${showInput.show}`}
          onClick={editProfileBtn}
        >
          Edit Profile
        </button>

        {/* Input Area */}
        <ul className={`hide ${showInput.show}`}>
          <li>
            <label>
              <i class="fas fa-signature"></i>
              <input
                type="text"
                name="name"
                placeholder="Change Your Name ..."
              />
            </label>
          </li>
          <li>
            <label>
              <i class="fas fa-unlock-alt"></i>
              <input
                type="text"
                name="password"
                placeholder="Change Your Password ..."
              />
            </label>
          </li>
          <li>
            <label>
              <i class="fas fa-city"></i>
              <input
                type="text"
                name="city"
                placeholder="Change Your City ..."
              />
            </label>
          </li>

          <li>
            <label>
              <i class="fas fa-camera"></i>
              <input type="submit" name="city" value="Change Profile Picture" />
            </label>
          </li>

          {/* Save / Cancel Buttons */}
          <div className="profile-save-cancel-btn">
            <button className="profile-save-btn">Save</button>
            <button className="profile-cancel-btn">Cancel</button>
          </div>
        </ul>
      </div>

      {/* Right Column / Main Content */}
      <div className="changing-account-type-area">
        <h1>Update Your Account!</h1>
        <button className="update-account-btn">Click Here</button>
      </div>
    </div>
  );
};

export default UserProfile;
