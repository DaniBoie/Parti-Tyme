const router = require('express').Router()
const { User, BuisnessData, Review } = require('../models')
const passport = require('passport')
const ProfileSettings = require('../models/ProfileSettings')

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

// UPDATE settings data
// router.put('/settings/:id', passport.authenticate('jwt'), (req, res) => {
//   ProfileSettings.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

//Route to get buisness reviews
router.get('/review/buisness', passport.authenticate('jwt'), (req, res) => {
  BuisnessData.find(req.user.Buisness)
    .populate('reviews')
    .then(Reviews => res.json(Reviews[0].reviews))
    .catch(err => console.log(err))
})

module.exports = router

