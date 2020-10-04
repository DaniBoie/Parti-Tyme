const router = require("express").Router();
const { User } = require("../models");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// ROUTE to register a new user
router.post("/users/register", (req, res) => {
  const { realname, email, username, password, account_type } = req.body;
  User.register(
    new User({ realname, email, username, account_type }),
    password,
    (err) => {
      if (err) {
        console.log(err);
      }
      res.sendStatus(200);
    }
  );
});

// ROUTE to login an existing user
router.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  User.authenticate()(username, password, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null);
  });
});

// Route to get all the user's information (including buisness & settings)
router.get("/users/me", passport.authenticate("jwt"), (req, res) => {
  User.find(req.user._id)
    .populate("Buisness")
    .populate("Settings")
    .populate("Reviews")
    .populate("reviews")
    .then((userData) => {
      // console.log(userData)
      // console.log(req)
      res.json(userData);
    })
    .catch((err) => console.log(err));
});

// Route to change the user's information
router.put("/users", passport.authenticate("jwt"), (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

module.exports = router;
