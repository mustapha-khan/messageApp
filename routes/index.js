var express = require("express");
var router = express.Router();
var users = require("../models/users");

/* GET home page. */
router.get("/", function(req, res, next) {});

router.get("/ac", function(req, res, next) {
  users.find().then(function(data) {
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
