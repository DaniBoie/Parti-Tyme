import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Importing Video
import Video from "../../components/assets/video/Homescreen.mp4";

const Home = () => {
  // const [, ] = useState({
  // })

  //   // HANDLING the inputs on the page.
  // ____.handleInputChange = event => {
  //   set___State({...___State, [event.target.name]: event.target.value})
  // }

  return (
    <div className="home-page">
      {/* Hero Image/Video */}
      <div className="home-hero-image">
        <video src={Video} autoPlay muted loop></video>
        <h1>It's never too late for <span>p</span>arti<span>t</span>yme</h1>
        <Link to='/businessview' className="home-hero-image-btn">Let's Go</Link>
      </div>
      {/* End Hero Image/Video */}

      {/* Right Column / Side Bar */}
      {/* <div className="home-side-bar">
          <div className="home-dropdown-list">
            <button>
              <i class="fas fa-chevron-circle-down"></i>
            </button>

            <div className="home-icon-list">
              <Link to="/" className="home-icons">
                <button aria-label="Home" data-balloon-pos="left"><i class="fas fa-home"></i></button>
              </Link>

              <Link to="/userprofile" className="home-icons">
                <button aria-label="User Profile" data-balloon-pos="left"><i class="fas fa-user"></i></button>
              </Link>

              <Link to="/businessview" className="home-icons">
                <button aria-label="Business" data-balloon-pos="left"><i class="fas fa-user-tie"></i></button>
              </Link>

            </div>
          </div>
        </div> */}
      {/* End Side Bar Area */}
    </div>
  );
};

export default Home;
