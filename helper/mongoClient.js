var mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/meassage", {
    useNewUrlParser: true
  })
  .then(function() {
    console.log("prmise");
  });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("db connected"));
