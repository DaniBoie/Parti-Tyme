import React, {useState} from 'react'
import BusinessCard from '../../components/BusinessCard/BusinessCard'
import ProfileImage from "../../components/assets/images/business-2.jpg";


const BusinessProfile = () => {
  const [showInput, setShowInput] = useState({
    show: "",
  });

  function editProfileBtn() {
    if (showInput.show === "") setShowInput({ show: "profile-input-show" });
    else setShowInput({ show: "" });
  }
  return ( 
    <>
       <div className="user-profile-page">
      {/* Left Column / Profile Basic Info */}
      <div className="changing-basic-info-area">
        <img className="profile-image" src={ProfileImage} alt="Profile Image" />
        <h1>Business name</h1>
        <p>City Of The Business</p>

        <button className={`update-account-btn`}>Update Your Business</button>

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
              <i className="fas fa-signature"></i>
              <input
                type="text"
                name="name"
                placeholder="Change Your Name ..."
              />
            </label>
          </li>
          <li>
            <label>
              <i className="fas fa-unlock-alt"></i>
              <input
                type="text"
                name="password"
                placeholder="Change Your Password ..."
              />
            </label>
          </li>
          <li>
            <label>
              <i className="fas fa-pen"></i>
              <input 
                type="text"
                name="description"
                placeholder="Change Your Description..."
              />
            </label>
          </li>
          <li>
            <label>
              <i className="fas fa-link"></i>
              <input 
                type="text"
                name="Link"
                placeholder="Change Your WebLink..."
              />
            </label>
          </li>
          <li>
            <label>
              <i className="fas fa-camera"></i>
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
        <h1>Reservations Made!</h1>
        <button className="update-account-btn">Click Here to see the Reservations!</button>
      </div>
    </div>
    </>
  )
}

export default BusinessProfile