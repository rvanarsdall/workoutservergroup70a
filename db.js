const Sequelize = require("sequelize");

const sequelize = new Sequelize("workout-server-new", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to the New Workout Server");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
