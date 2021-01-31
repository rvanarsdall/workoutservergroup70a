const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", function (req, res) {
  // create a new user
  const username = req.body.username;
  const password = req.body.password;

  User.create({
    username: username,
    passwordhash: bcrypt.hashSync(password, 13),
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, "i_am_secret", {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        userInfo: user,
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    where: {
      username: username,
    },
  }).then(function loginSuccess(user) {
    if (user) {
      //We found a user match

      // validate the password
      bcrypt.compare(password, user.passwordhash, function (err, matches) {
        if (matches) {
          // the passwords match execute code here
          let token = jwt.sign({ id: user.id }, "i_am_secret", {
            expiresIn: 60 * 60 * 24,
          });

          res.json({
            userInfo: user,
            sessionToken: token,
          });
        } else {
          // passwords do not match execute code here
          res.json({ error: "Login Failed" });
        }
      });
    } else {
      // No user Match
      res.json({ error: "User does not exist" });
    }
  });
});

module.exports = router;
