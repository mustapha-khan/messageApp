const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./helper/mongoClient");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var groupRouter = require("./routes/group");
var msgRouter = require("./routes/messages");
var app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cookieParser());

app.get("/", express.static(path.join(__dirname, "public")));
app.use("/index", indexRouter); //index/ac
app.use("/users", usersRouter);
app.use("/group", groupRouter);
app.use("/messages", msgRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
