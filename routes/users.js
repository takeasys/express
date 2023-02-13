var express = require("express");
var router = express.Router();
var clientService = require("../controllers/user")

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");

  const userService = new clientService();
  const allclients = userService.getAllclients()

  res.send(allclients)
});

module.exports = router;
