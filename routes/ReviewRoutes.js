const router = require("express").Router();
const { User, BuisnessData, Review } = require("../models");
const passport = require("passport");
const ProfileSettings = require("../models/ProfileSettings");
const { findById } = require("../models/ProfileSettings");

// CREATE settings data
router.post("/review", passport.authenticate("jwt"), (req, res) => {
  Review.create({
    topic: req.body.topic,
    text: req.body.text,
    rating: req.body.rating,
    user: req.user._id,
    buisness: req.body.buisness,
  }).then((data) => {
    User.findByIdAndUpdate(data.user, { $push: { Reviews: data._id } })
      .then(() => console.log(data))
      .catch((err) => console.log(err));

    BuisnessData.findByIdAndUpdate(data.buisness, {
      $push: { reviews: data._id },
    })
      .then(() => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  });
});

//Route to get buisness reviews
router.get("/review/buisness/:id", (req, res) => {
  BuisnessData.findById(req.params.id)
    .populate("reviews")
    .then((data) => {
      console.log(data);
      res.json(data.reviews);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
