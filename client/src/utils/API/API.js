import axios from "axios";

const API = {
  // **USER API CALLS**

  // Send Frontend data as object
  registerUser: (data) => axios.post(`/api/users/register`, data),
  loginUser: (data) => axios.post('/api/users/login', data),
  getUser: () => 
    axios.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    }),

  // **USER PROFILE API CALLS**
  createSettings: (data, headers) => axios.post(`/api/settings`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  } ),
  updateSettings: (data) => axios.put("/api/settings", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    }),

  // **BUISNESS API CALLS**
  createBusiness: (data) => axios.post(`/api/buisness`, data),
  updateBusiness: (data) => axios.put("/api/buisness", data),
  searchBusinessName: (searchTerm) =>
    axios.get(`/api/buisness/filter/${searchTerm}`),
  searchBusinessCategory: (category) =>
    axios.get(`/api/buisness/search/${category}`),
  getAllBusiness: () => axios.get('/api/buisness'),
  getOneBusiness: (id) => 
    axios.get(`/api/business/${id}`),
  // !!! USE WITH EXTREME CAUTION !!!
  nukeBusiness: () => axios.delete("/api/buisness"),

  // **REVIEW API CALLS**
  createReview: (id) => axios.post(`/api/review/${id}`),
  findBusinessReviews: (id) => axios.get(`/api/review/buisness/${id}`),

  // **Filtering Algorithms**
  filterPrice: (maxPrice, oldArray) => {
    let newArray = oldArray.filter((business) => business.fee <= maxPrice);
    return newArray;
  },

  filterSubcategory: (subCategory, oldArray) => {
    let newArray = oldArray.filter( (business) => business.subCategory === subCategory);
    return newArray;
  },

  filterCategory: (category, oldArray) => {
    if(category === 'All'){
      return oldArray
    } else {
    let newArray = oldArray.filter( (business) => business.buisness_type === category );
    return newArray
    }
  }

};

export default API;
