const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')


// ROUTE to register a new user
router.post('/users/register', (req, res) => {
  const { realname, email, username, password, account_type } = req.body
  User.register(new User({ realname, email, username, account_type }), password, err => {
    if (err) {
      console.log(err)
    } res.sendStatus(200)
  })
})

// ROUTE to login an existing user
router.post('/users/login', (req, res) => {
  const { username, password } = req.body
  User.authenticate()(username, password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

// Route to get all the user's information (including buisness & settings)
router.get('/users/me', passport.authenticate('jwt'), (req, res) => {
  User.find(req.user._id)
    .populate('Buisness')
    .populate('Settings')
    .then(userData => res.json(userData))
    .catch(err => console.log(err))
})

// ROUTE to populate the user's buisness
router.get('/users/buisness', passport.authenticate('jwt'), (req, res) => {
  User.find(req.user._id)
    .populate('Buisness')
    .then(Buisness => res.json(Buisness))
    .catch(err => console.log(err))
})

// Route to populate the user's settings
router.get('/users/settings', passport.authenticate('jwt'), (req, res) => {
    User.find(req.user._id)
    .populate('Settings')
    .then(Settings => res.json(Settings))
    .catch(err => console.log(err))
})

module.exports = router