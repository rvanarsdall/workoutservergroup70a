const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");

const validateSession = function (req, res, next) {
  // store token a variable

  const token = req.headers.authorization;

  if (!token) {
    // No Token - No access
    res.json({ auth: "fail", message: "No Token Provided" });
  } else {
    // Yes we have a token - we need to validate the token

    jwt.verify(token, "i_am_secret", function (err, decodeToken) {
      // No Error and DecodedToken
      if (!err && decodeToken) {
        //Check the user table for the user that is logged in
        User.findOne({
          where: {
            id: decodeToken.id,
          },
        })
          .then((user) => {
            if (!user) {
              throw err;
            }
            req.user = user;
            return next();
          })
          .catch((err) => next(err));
      } else {
        // There was an error or token expired or token to valid
        req.errors = err;
        return res.json({ error: "Not Authorized" });
      }
    });
  }
};

module.exports = validateSession;
