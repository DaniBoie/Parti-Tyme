const router = require("express").Router();
const { User, BuisnessData, ProfileSettings } = require("../models");
const passport = require("passport");

// Find One Buisness
router.get("/buisness/:id", (req, res) => {
  // res.send(req.params.id);
  BuisnessData.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path:"user",
        populate: {
          path: "Settings",
          model: "ProfileSettings"
        }
      }
    })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

// Filter Buisness by Search
router.get("/buisness/filter/:search", (req, res) => {
  let search = req.params.search.toLowerCase();
  let searchResults = [];
  BuisnessData.find({})
    .then((data) => {
      if (req.params.search === "all") {
        res.send(data);
      } else {
        data.forEach((element) => {
          let find = element.name.toLowerCase();
          if (find.includes(search)) {
            searchResults.push(element);
            console.log(searchResults);
          } else {
            console.log("No Match");
          }
        });
        res.send(searchResults);
      }
    })
    .catch((err) => console.log(err));
});

// Filter Buisness by Category
router.get("/buisness/search/:category", (req, res) => {
  let searchResults = [];
  BuisnessData.find({})
    .then((data) => {
      data.forEach((buisness) => {
        let search = req.params.category;
        let find = buisness.buisness_type;
        if (find === search) {
          searchResults.push(buisness);
          console.log(searchResults);
        } else {
          console.log("No Match");
        }
      });
      res.send(searchResults);
    })
    .catch((err) => console.log(err));
});

// FIND all buisness data
router.get("/buisness", (req, res) => {
  BuisnessData.find({})
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

// CREATE buisness data
router.post("/buisness", passport.authenticate("jwt"), (req, res) => {
  BuisnessData.create({
    name: req.body.name,
    bio: req.body.bio,
    instagram: req.body.instagram,
    website: req.body.website,
    facebook: req.body.facebook,
    buisness_type: req.body.buisness_type,
    fee: req.body.fee,
    rating: 0,
    location: req.body.location,
    slogan: req.body.slogan,
    user: req.user._id,
  })
    .then((data) => {
      User.findByIdAndUpdate(data.user, { $push: { Buisness: data._id } })
        .then(() => res.json(data))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// UPDATE buisness data
router.put("/buisness", passport.authenticate("jwt"), (req, res) => {
  BuisnessData.findByIdAndUpdate(req.user.Buisness, req.body)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// DELETE buisness data
router.delete("/buisness", passport.authenticate("jwt"), (req, res) => {
  BuisnessData.findByIdAndDelete(req.user.Buisness)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

router.put("/buisness/:id", passport.authenticate("jwt"), (req, res) => {
  BuisnessData.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});


//add favorite to users
router.put("/buisness/users/:id", passport.authenticate("jwt"), (req, res) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.params.id, { $push: { favorite: req.body.favorite } })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.put("/buisness/image/:id", passport.authenticate("jwt"), (req, res) => {
  console.log(req.body)
  BuisnessData.findByIdAndUpdate(req.params.id, { $push: {img: req.body.img} })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});


module.exports = router;
