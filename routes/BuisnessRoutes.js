const router = require('express').Router()
const { User, BuisnessData, ProfileSettings } = require('../models')
const passport = require('passport')

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
router.put('/buisness', passport.authenticate('jwt'), (req, res) => {
  BuisnessData.findByIdAndUpdate(req.user.Buisness, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// DELETE buisness data
router.delete('/buisness', passport.authenticate('jwt'), (req, res) => {

  BuisnessData.findByIdAndDelete(req.user.Buisness)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router