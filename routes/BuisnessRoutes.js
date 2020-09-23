const router = require('express').Router()
const { User, Blogpost } = require('../models')
const passport = require('passport')
const BuisnessData = require('../models/BuisnessData')
const ProfileSettings = require('../models/ProfileSettings')


// GET all business data
router.get('/business', (req, res) => {
  Blogpost.find()
    // .populate('user')
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

// CREATE buisness data
router.post('/buisness', passport.authenticate('jwt'), (req, res) => {
  BuisnessData.create({
    name: req.body.name,
    bio: req.body.bio,
    instagram: req.body.instagram,
    website: req.body.website,
    facebook: req.body.facebook,
    buisness_type: req.body.buisness_type,
    fee: req.body.fee,
    user: req.user._id
  })
    .then(data => {
      User.findByIdAndUpdate(data.user, { $push: { Buisness: data._id } })
        .then(() => res.json(data))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// UPDATE buisness data
router.put('/buisness/:id', passport.authenticate('jwt'), (req, res) => {
  BuisnessData.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// DELETE buisness data
router.delete('/blogposts/:id', passport.authenticate('jwt'), (req, res) => {
  BuisnessData.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.post('/settings', passport.authenticate('jwt'), (req, res) => {
  ProfileSettings.create({
    img: req.body.name,
    bio: req.body.bio,
    instagram: req.body.instagram,
    facebook: req.body.facebook,
    user: req.user._id
  })
    .then(data => {
      User.findByIdAndUpdate(data.user, { $push: { Settings: data._id } })
        .then(() => res.json(data))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


module.exports = router