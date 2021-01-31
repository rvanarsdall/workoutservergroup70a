let express = require("express");
let router = express.Router();
let Log = require("../db").import("../models/log");
let validateSession = require("../middleware/validate-session");

// create a route for a practice route
// localhost:3000/log/practice

//GET, PUT, DELETE, POST

router.get("/practice", validateSession, function (req, res) {
  res.send("Practice Route Works");
});

// Create Workout
router.post("/", validateSession, function (req, res) {
  const workoutEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req.user.id,
  };

  Log.create(workoutEntry)
    .then((log) => res.json(log))
    .catch((err) => res.json({ error: err }));
});

//Get all logs of user logged in

router.get("/", function (req, res) {});

module.exports = router;
