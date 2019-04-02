const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const Groups = require("../models/group");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
router.post("/register", (req, res) => {
  Users.findOne({
    email: { $regex: new RegExp("^" + req.body.email.toLowerCase(), "i") }
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password
    });
    // encrypt password b4 saving in db
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.email
        };
        User.find({ email: { $ne: email } }).then(userAll => {
          Groups.find({ members: { $elemMatch: { email: email } } }).then(
            grp => {
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                    user: user,
                    userAll: userAll,
                    userGrp: grp
                  });
                }
              );
            }
          );
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
