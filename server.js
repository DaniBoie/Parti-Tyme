const express = require("express");
const { join } = require("path");
require("dotenv").config();
const passport = require("passport");
const { Strategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const session = require('express-session');  // session middleware
const { User } = require("./models");
const { DH_CHECK_P_NOT_PRIME } = require("constants");

const app = express();

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
})); 

app.use(passport.initialize());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "client", "build")));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"));
  });
}

// PASSPORT AUTH

app.use(passport.session());

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    ({ id }, cb) =>
      User.findById(id)
        .populate("")
        .then((user) => cb(null, user))
        .catch((err) => cb(err))
  )
);

require("./db")
  .then(() => app.listen(process.env.PORT || 3002))
  .catch((err) => console.log(err));
