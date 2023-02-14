var express = require("express");
var router = express.Router();
var UserService = require("../services/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await UserService.getUsers();
    res.send(users);
  } catch (err) {
    console.log("==== userRoute error ====", err);
  }
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const user = await UserService.getUserById(id);
    res.send(user);
  } catch (err) {
    console.log("==== userRoute error ====", err);
  }
});

router.get("/add", function (req, res, next) {
  req.body = {
    username: "test",
    password: "test",
  };
  try {
    const newUser = UserService.addUser(req.body);
    res.send(newUser);
  } catch (err) {
    console.log("==== userRoute error ====", err);
  }
});

module.exports = router;
