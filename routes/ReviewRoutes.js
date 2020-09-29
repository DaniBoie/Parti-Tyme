const router = require('express').Router()
const { User, BuisnessData, Review } = require('../models')
const passport = require('passport')
const ProfileSettings = require('../models/ProfileSettings')
const { findById } = require('../models/ProfileSettings')

// CREATE settings data
router.post('/review', passport.authenticate('jwt'), (req, res) => {
  Review.create({
    text: req.body.text,
    rating: req.body.rating,
    user: req.user._id,
    buisness: req.user.buisnessId
  })
    .then(data => {
      User.findByIdAndUpdate(data.user, { $push: { Reviews: data._id } })
        .then(() => console.log(data))
        .catch(err => console.log(err))
      BuisnessData.findByIdAndUpdate(req.body.buisnessId, { $push: { reviews: data._id }})
        .then(() => res.json(data))
        .catch(err => console.log(err))
    })

})

//Route to get buisness reviews
router.get('/review/buisness/:id', passport.authenticate('jwt'), (req, res) => {
  BuisnessData.findById(req.params.id)
    .populate('Review')
    .then((data) => {
    res.json(data.reviews)
  })
  .catch(err => console.log(err))
})

module.exports = router

