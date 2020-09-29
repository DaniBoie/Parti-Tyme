import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./BusinessView.css";
import ViewCard from '../../components/ViewCard'


const BuisnessView = () => {


  const [businessState, setBusinessState] = useState({
    businesses: [],
    businessRender: [],
    selectValue: 'All',
    ipsum: ""
  })

  businessState.handleInputChange = event => {
    console.log(event.target.checked)
    setBusinessState({ ...businessState, [event.target.name]: event.target.value })
    
  }

  businessState.handleCheckboxChange = event => {
    console.log(event.target.checked)
    setBusinessState({ ...businessState, [event.target.name]: event.target.checked })
  }

  useEffect(() => {
    API.getAllBusiness()
      .then(({ data }) => {
        console.log("API DATA ", data)
        setBusinessState({ ...businessState, businesses: data, businessRender: data })
      })
      .catch(err => console.log(err))

  }, [])

  const handleSearchCategory = () => {
    
    console.log(businessState.selectValue)

    let filteredArray = API.filterCategory(businessState.selectValue, businessState.businesses)

    if (filteredArray.length === 0){
      alert('No Matches Found')
    } else {
      setBusinessState({ ...businessState, businessRender: filteredArray })
    }

    console.log(filteredArray)
    // API.searchBusinessCategory(category)
    //   .then(( {data} ) => {
    //     setBusinessState({ ...businessState, businessRender: data })
    //     console.log(data)
    //   })
    //   .catch(err => console.log(err))
  }

  const handleFilter = () => {

    // API.searchBusinessCategory(businessState.selectValue)
    //   .then(({ data }) => {
    //     setBusinessState({ ...businessState, businessRender: data })
    //     console.log(data)
    //   })
    //   .catch(err => console.log(err))

    switch (businessState.selectValue) {
      case 'Entertainment':
        handleSearchCategory('Entertainment')
        break;
      case 'Food':
        handleSearchCategory('Food')
        break;
      case 'All':
        handleFilterClear()
        break;
      case 'Music':
        handleSearchCategory('Music')
        break;

    }
    
  }

  const handleFilterClear = () => {

    setBusinessState({...businessState, businessRender: businessState.businesses})
    console.log(businessState.ipsum)
  }

  const handleRadio = (event) => {
   event.preventDefault()
    console.log('checked')
  }



  return (
    <div className="business-view-page">

      {/* Left Column / Filter Column  */}
      <div className="filter-column">

        {/* Dropdown category */}
        {/* <button className="bvp-dropdown-category-btn">Categories <i class="fas fa-caret-down"></i></button> */}

        <div className="bvp-dropdown-categories-list-item">
          <form>
            <select name="selectValue" onChange={businessState.handleInputChange}>
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Music">Music</option>
              <option value="Rentals">Rentals</option>
              <option value="Entertainment">Entertainment</option>
              <option value="#">Something</option>
            </select>
          </form>
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
                <input type="checkbox" name="ipsum" onChange={businessState.handleCheckboxChange}/>
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
            onClick={handleFilter}
          >
            Save
              </button>
          <button
            onClick={handleFilterClear}
          >
            Clear
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
