import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./BusinessView.css";
import ViewCard from '../../components/ViewCard'

// Importing Example Images
import BusinessImage1 from "../../components/images/business-1.jpg";
import BusinessImage2 from "../../components/images/business-2.jpg";
import BusinessImage3 from "../../components/images/business-3.jpg";
import BusinessImage4 from "../../components/images/business-4.jpg";
// import BusinessImage5 from '../../components/images/business-5.jpg'


const BuisnessView = () => {


  const [businessState, setBusinessState] = useState({
    businesses: [],
    businessRender: [],
  })

  businessState.handleInputChange = event => {
    setBusinessState({ ...businessState, [event.target.name]: event.target.value })
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
    console.log('handling')
    API.searchBusinessCategory('Entertainment')
    .then(({data}) => {
      setBusinessState({ ...businessState, businessRender: data })
      console.log(data)})
    .catch(err => console.log(err))
  }

  const handleFilter = () => {
    console.log('lcik')
  }

  const handleFilterClear = () => {

    setBusinessState({ ...businessState, businessRender: businessState.businesses})
  }

  return (
    <div className="business-view">
      <div className="business-view-main-content">
        <div className="business-view-main-box">
          <div className="filter-column">
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
              <button
              onClick={handleSearchCategory}
              >
                Save Search
              </button>
              <button
                onClick={handleFilterClear}
              >
                Save Search
              </button>
            </div>
          </div>

          <div className="business-column">

            {
            businessState.businessRender.length > 0 ? (
              businessState.businessRender.map(business => (
                <ViewCard business={business} />
              ))
            ) : null
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default BuisnessView;
