import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./BusinessView.css";
import ViewCard from '../../components/ViewCard'


const BuisnessView = () => {


  const [businessState, setBusinessState] = useState({
    businesses: [],
    businessRender: [],
    selectValue: '',
  })

  businessState.handleInputChange = event => {
    setBusinessState({ ...businessState, [event.target.name]: event.target.value })
    console.log(businessState)
  }

  useEffect(() => {
    API.getAllBusiness()
      .then(({ data }) => {
        console.log("API DATA ", data)
        setBusinessState({ ...businessState, businesses: data, businessRender: data })
      })
      .catch(err => console.log(err))

  }, [])

  const handleSearchCategory = (event) => {
    event.preventDefault()
    API.searchBusinessCategory()
      .then(({ data }) => {
        setBusinessState({ ...businessState, businessRender: data })
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  const handleFilter = () => {
    console.log('click')
  }

  const handleFilterClear = () => {

    setBusinessState({ ...businessState, businessRender: businessState.businesses })
  }



  return (
    <div className="business-view-page">

      {/* Left Column / Filter Column  */}
      <div className="filter-column">

        {/* Dropdown category */}
        <button className="bvp-dropdown-category-btn">Categories <i class="fas fa-caret-down"></i></button>

        <div className="bvp-dropdown-categories-list-item">
          <button className="bvp-dropdown-categories-items">Food</button>
          <button className="bvp-dropdown-categories-items">Music</button>
          <button className="bvp-dropdown-categories-items">Rentals</button>
          <button className="bvp-dropdown-categories-items">SomeThing</button>
          <button className="bvp-dropdown-categories-items">SomeThing</button>
          <button className="bvp-dropdown-categories-items">SomeThing</button>
        </div>

        <h2>Filters</h2>

        <div className="filter-list">
          <label className="filter-items">
            {" "}
                Lorem
                <input
              type="checkbox"
              name="foodFilter"

            />
            <span className="checkmark"></span>
          </label>

          <label className="filter-items">
            {" "}
                ipsum
                <input type="checkbox" onChange={handleFilter} />
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

        <div className="filter-column-buttons">
          <button
            onClick={handleSearchCategory}
          >
            Save Search
              </button>
          <button
            onClick={handleFilterClear}
          >
            Clear Search
              </button>
        </div>
      </div>

      {/* Right Column / Business Column  */}
      <div className="bvp-business-column">
        {
          businessState.businessRender.length > 0 ? (
            businessState.businessRender.map(business => (
              <ViewCard business={business} />
            ))
          ) : null
        }
      </div>
    </div>
  );
};

export default BuisnessView;
