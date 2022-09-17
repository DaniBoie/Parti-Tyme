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
    priceSearch: 1000,
    searchText: ""
  });

  const [searchState, setSearchState] = useState({
    searchTerm: "All Categories",
    termShown: false
  });

  businessState.handleInputChange = (event) => {
    setBusinessState({
      ...businessState,
      [event.target.name]: event.target.value,
    });
  };

  businessState.handleCheckboxChange = (event) => {
    console.log(event.target.name)
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

  // Search Button
  const handleSearch = () => {
    let filterCategory = businessState.selectValue

    let filteredArray = API.filterCategory(
      filterCategory,
      businessState.businesses
    );

    if (businessState.maxPrice) {
      console.log("Max Price Ticked");
      filteredArray = API.filterPrice(
        businessState.priceSearch || 1000000,
        filteredArray
      );
    }

    if (businessState.distance) {
      console.log("ticked2");
    }

    setBusinessState({ ...businessState, businessRender: filteredArray });

    if (filterCategory === 'All') {
      filterCategory = 'All Categories'
    }
    setSearchState({ ...searchState, searchTerm: filterCategory})

    console.log(filteredArray);
  };

  // Clear Button
  const handleFilterClear = () => {
    setBusinessState({
      ...businessState,
      businessRender: businessState.businesses
    });

    document.getElementById("maxCheck").checked = false;
    document.getElementById("distanceCheck").checked = false;

    document.getElementById("dropdown").selectedIndex = 0;

    setSearchState({ ...searchState, searchTerm: "All Categories" });

    setShowPrice({ ...showPrice, price: "hide-price-search" });
  };

  // Search Button
  function handleSearchBar() {
    let text = businessState.searchText
    API.searchBusinessName(text)
      .then(({ data }) => {
        if (data.length > 0) {
          setBusinessState({ ...businessState, businessRender: data});
          setSearchState({...searchState, searchTerm: text})
        } else {
          alert("No Matches Found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function to show and hide price number
  const [showPrice, setShowPrice] = useState({ price: "hide-price-search" });

  function showPriceCheck() {
    if (showPrice.price === "hide-price-search") {
      setShowPrice({ ...showPrice, price: "" });
    } else {
      setShowPrice({ ...showPrice, price: "hide-price-search" });
    }
  }

  let scrollFunctionality = (event) => {
    event.preventDefault()
    if (event.target.scrollTop > 50) {
      document.getElementById("filter-search").classList.add('hideFilters');
    } else {
      document.getElementById("filter-search").classList.replace('hideFilters', 'showFilters')
    }
  }

  return (
    <>
      <Nav name="Home Page" />
      <div className="business-view-page">
        {/* Left Column / Filter Column  */}
        <div className="filter-column showFilters" id="filter-search">
          {/* Search Bar */}
          <div className="bvp-search-bar">
            <input
              className="bvp-search-text"
              type="text"
              name="searchText"
              placeholder="search by name..."
              onChange={businessState.handleInputChange}
            />
            <button
              className="bvp-search-button"
              value="name"
              onClick={handleSearchBar}
            >
              <i class="fas fa-search"></i>
            </button>
          </div>

          <p>search results for "{searchState.searchTerm}"</p>

          <h2>filters:</h2>
          {/* Dropdown category */}
          <div className="bvp-dropdown-categories-list-item">
            <form>
              <select
                id="dropdown"
                name="selectValue"
                onChange={businessState.handleInputChange}
              >
                <option value="All">All Categories</option>

                <option value="Food">Food</option>
                <option value="Music">Music</option>
                <option value="Rentals">Rentals</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </form>
          </div>

          
          <div className="filter-list">
            

            <div className="filter-items">
              <input
                onClick={showPriceCheck}
                type="checkbox"
                name="maxPrice"
                onChange={businessState.handleCheckboxChange}
                id="maxCheck"
              />

              <label>max price</label>
              <input
                className={`search-price ${showPrice.price}`}
                type="number"
                name="priceSearch"
                min="10"
                max="9999"
                onChange={businessState.handleInputChange}
              />
            </div>
            <div className="filter-items">
              <input
                type="checkbox"
                name="distance"
                onChange={businessState.handleCheckboxChange}
                id="distanceCheck"
              />
              <label>coming soon!</label>
            </div>
          </div>

          <div className="filter-column-buttons">
            <button onClick={handleSearch}>search</button>
            <button onClick={handleFilterClear}>clear</button>
          </div>
        </div>
        
        {/* Right Column / Business Column  */}
        <div className="bvp-business-column" onScroll={scrollFunctionality}>
          {businessState.businessRender.length > 0
            ? businessState.businessRender.map((business) => (
                <BusinessCard business={business} key={business._id}/>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default BuisnessView;
