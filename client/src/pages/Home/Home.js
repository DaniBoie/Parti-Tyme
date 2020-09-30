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
        <a href="#jump-to-main-content">Let's Go</a>
      </div>
      {/* End Hero Image/Video */}

      {/* Main Area */}
      <div className="home-main-content-area">
        {/* Left Column / Filter Area */}
        <div className="home-filter-column">
          <a id="jump-to-main-content">Filters</a>

          <div className="filter-list">
            <label className="filter-items">
              {" "}
              Lorem
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="filter-items">
              {" "}
              ipsum
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="filter-items">
              {" "}
              dolor
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="filter-items">
              {" "}
              sit
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="filter-items">
              {" "}
              consectetur
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="filter-items">
              {" "}
              adipisicing
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="filter-items">
              {" "}
              Tempora
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        {/* End Filter Area */}

        {/* Middle Column / Main Content */}
        <div className="home-content-column">
          <h2>Lorem</h2>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            minima in recusandae asperiores unde quasi, consequatur excepturi
            laudantium aliquid delectus alias voluptatum necessitatibus laborum
            tenetur assumenda enim accusantium nisi aliquam?
          </p>
        </div>
        {/* End Main Content Column */}

        {/* Right Column / Side Bar */}
        <div className="home-side-bar">
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

              {/* <Link to="/login" className="home-icons">
                <i class="fas fa-sign-in-alt"></i>
              </Link>

              <Link to="/logout" className="home-icons">
                <i class="fas fa-sign-out-alt"></i>
              </Link> */}
            </div>
          </div>
        </div>
        {/* End Side Bar Area */}
      </div>
    </div>
  );
};

export default Home;
