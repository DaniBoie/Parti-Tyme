import React, { useState, useEffect } from "react"
import "./UserProfile.css"
import ProfileImage from "../../components/images/business-2.jpg"
import API from "../../utils/API/API"

const UserProfile = () => {

  // Function to show / hide input area when click on "Edit Profile" Button
  const [showInput, setShowInput] = useState({
    show: "",
  })

  function editProfileBtn() {
    if (showInput.show === "") setShowInput({ show: "profile-input-show" })
    else setShowInput({ show: "" }) 
    console.log(userState)
  }

  const [userState, setUserState] = useState({
    id: '',
    realname:'',
    username: '',
    email: '',
    account_type:'',
    Reviews:[],
    Buisness: '',
    text:'',
    rating: '',
    buisiness: '',
    user:[]
  })

  useEffect(() => {
    API.getUser()
      .then(({data}) => {
        let dataComeback = data[0]

        setUserState({ ...userState, id: dataComeback._id, realname: dataComeback.realname, username: dataComeback.username, email: dataComeback.email, account_type: dataComeback.account_type, Reviews: dataComeback.Reviews || [], Buisness: dataComeback.Buisness })

        console.log(dataComeback)
      })
      .catch(err => console.log(err))
    
  },[])

  userState.handleInputChange = event => {
    setUserState({ ...userState, [event.target.name]:event.target.value })
  }

  userState.handleClickBtn = () => {
    let review = {
      text: userState.text,
      rating: userState.rating,
      user: userState.id,
      buisness: userState.buisiness
    }

    API.createReview(review)
      .then(({data}) => {
        setUserState({ ...userState, Reviews: Reviews.push(data)})
      })
  }

  return (
    <div className="user-profile-page">

      <div className="changing-basic-info-area">
        <img className="profile-image" src={ProfileImage} alt="Profile Image" />
        <h1>{userState.realname}</h1>
        <p>City Of The User</p>

        <button className={`update-account-btn`}>Update Your Account</button>

        <button
          className={`edit-profile-btn ${showInput.show}`}
          onClick={editProfileBtn}
        >
          Edit Profile
        </button>


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


          <div className="profile-save-cancel-btn">
            <button className="profile-save-btn">Save</button>
            <button className="profile-cancel-btn">Cancel</button>
          </div>
        </ul>
      </div>


      <div className="changing-account-type-area">
        <h1>Welcome back {userState.username}</h1>
        <h3>{userState.email}</h3>
        <div>
          <h3>Reviews</h3>
          {
            userState.Reviews.length > 0 ? (
              userState.Reviews.map(review => (
                <div key={review._id}>
                  <h4>{review.buisness.name}</h4>
                  <p>{review.rating}</p>
                  <p>{review.rating}</p>
                </div>
            ))) : null
          }
        </div>
        <div>
          <label>
            <i class="fas fa-camera"></i>
            <input 
              type="submit" 
              ame="buisness" 
              onChange={userState.handleInputChange}/>
            <input
              type="submit"
              name="rating"
              onChange={userState.handleInputChange}/>
            <input
              type="submit"
              name="text"
              onChange={userState.handleInputChange}/>
          </label>
          <button onClick={userState.handleClickBtn}>Submit</button>
        </div>
      </div>
    </div>
  )
}
          
export default UserProfile;
