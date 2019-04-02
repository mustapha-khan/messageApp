const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const MessagesSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  grpId: {
    type: String,
    required: false
  },
  sender: {
    type: Object,
    required: true
  },
  receiver: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Messages = mongoose.model("Messages", MessagesSchema);
