import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./BusinessView.css";

// Importing Components
import Nav from "../../components/Nav";
import BusinessCard from "../../components/BuisnessCard";

const BuisnessView = () => {
  const [businessState, setBusinessState] = useState({
    businesses: [],
    businessRender: [],
    selectValue: "All",
    maxPrice: false,
    distance: false,
  });

  businessState.handleInputChange = (event) => {
    setBusinessState({
      ...businessState,
      [event.target.name]: event.target.value,
    });
  };

  businessState.handleCheckboxChange = (event) => {
    setBusinessState({
      ...businessState,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    API.getAllBusiness()
      .then(({ data }) => {
        console.log("API DATA ", data);
        setBusinessState({
          ...businessState,
          businesses: data,
          businessRender: data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    // console.log(businessState.selectValue)

    let filteredArray = API.filterCategory(
      businessState.selectValue,
      businessState.businesses
    );

    if (businessState.maxPrice) {
      console.log("Max Price Ticked");
      filteredArray = API.filterPrice(99, filteredArray);
    }

    if (businessState.distance) {
      console.log("ticked2");
    }

    setBusinessState({ ...businessState, businessRender: filteredArray });

    console.log(filteredArray);
  };

  const handleFilterClear = () => {
    setBusinessState({
      ...businessState,
      businessRender: businessState.businesses,
    });
  };

  // Search Button
  function handleSearchButton() {
    console.log("Function For Search Button");
  }

  return (
    <>
      <Nav name="Home Page" />
      <div className="business-view-page">
        {/* Left Column / Filter Column  */}
        <div className="filter-column">
          {/* Search Bar */}
          <div className="bvp-search-bar">
            <input
              className="bvp-search-text"
              type="text"
              name="searchText"
              placeholder="Type To Seach..."
            />
            <button className="bvp-search-button" onClick={handleSearchButton}>
              <i class="fas fa-search"></i>
            </button>
          </div>
          {/* Dropdown category */}
          <div className="bvp-dropdown-categories-list-item">
            <form>
              <select
                name="selectValue"
                onChange={businessState.handleInputChange}
              >
                <option value="All">Categories</option>

                <option value="Food">Food</option>
                <option value="Music">Music</option>
                <option value="Rentals">Rentals</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </form>
          </div>

          <h2>Filters</h2>

          <div className="filter-list">
            <label className="filter-items">
              {" "}
              Distance
              <input
                type="checkbox"
                onChange={businessState.handleCheckboxChange}
                name="distance"
              />
              <span className="checkmark"></span>
            </label>

            <label className="filter-items">
              {" "}
              Max Price
              <input
                type="checkbox"
                name="maxPrice"
                onChange={businessState.handleCheckboxChange}
              />
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
          </div>

          <div className="filter-column-buttons">
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleFilterClear}>Clear</button>
          </div>
        </div>

        {/* Right Column / Business Column  */}
        <div className="bvp-business-column">
          {businessState.businessRender.length > 0
            ? businessState.businessRender.map((business) => (
                <BusinessCard business={business} />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default BuisnessView;
