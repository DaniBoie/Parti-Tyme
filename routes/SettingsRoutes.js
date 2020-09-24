const router = require('express').Router()
const { User, Blogpost } = require('../models')
const passport = require('passport')
const ProfileSettings = require('../models/ProfileSettings')

// CREATE settings data
router.post('/settings', passport.authenticate('jwt'), (req, res) => {
  ProfileSettings.create({
    img: req.body.img,
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

// UPDATE settings data
router.put('/settings', passport.authenticate('jwt'), (req, res) => {
  ProfileSettings.findByIdAndUpdate(req.user.Settings, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router

