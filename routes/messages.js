const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Messages = require("./../models/messages");

const Groups = require("../models/group");

router.post("/send", function(req, res) {
  Messages.create({
    message: req.body.message,
    sender: req.body.sender,
    receiver: req.body.receiver,
    grpId: req.body.grpId
  })
    .then(ret => {
      res.json({ code: 200, status: true, msg: ret });
    })
    .catch(err => {
      res.json({ code: 400, status: false, err: err });
    });
});

router.post("/get", function(req, res) {
  console.log(`${req.body.senderEmail}        ${req.body.email}`);

  Groups.find({ _id: req.body.senderEmail })
    .then(arg => {
      if (arg.length > 0) {
        Messages.find({
          "receiver._id": req.body.senderEmail
        })
          .then(ret => {
            res.json({ code: 200, status: true, msg: ret });
          })
          .catch(err => {
            res.json({ code: 400, status: false, err: err });
          });
      } else {
        Messages.find({
          $or: [
            {
              "receiver._id": req.body.email,
              "sender._id": req.body.senderEmail
            },
            {
              "receiver._id": req.body.senderEmail,
              "sender._id": req.body.email
            }
          ]
        })
          .then(ret => {
            res.json({ code: 200, status: true, msg: ret });
          })
          .catch(err => {
            res.json({ code: 400, status: false, err: err });
          });
      }
    })
    .catch(err => {});
});

module.exports = router;
