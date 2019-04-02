const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Groups = require("./../models/group");

router.post("/create", function(req, res) {
  Groups.findOne({ name: req.body.name }).then(item => {
    if (item) {
      console.log(item);
      return res.status(400).json({ group: "Group already exists" });
    }
    Groups.create({ name: req.body.name, members: req.body.members }).then(
      ret => {
        console.log("grop done");
        res.json({ code: 200, status: true, group: ret });
      }
    );
  });
});

module.exports = router;
