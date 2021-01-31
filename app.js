let express = require("express");
let app = express();
let sequelize = require("./db");
let logController = require("./controllers/logcontroller");
let userController = require("./controllers/usercontroller");

sequelize.sync();
// localhost:3000/log/practice

app.use(express.json());
app.use("/user", userController);
app.use("/log", logController);

app.listen(3000, function () {
  console.log("this app is running on port 3000");
});
