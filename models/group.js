const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: Object,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Groups = mongoose.model("Groups", GroupSchema);
