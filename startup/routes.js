const express = require("express");
const register = require("../routes/register");
const auth = require("../routes/auth");
const me = require("../routes/me");
const cookie = require("../routes/cookies");
const cookieParser = require("cookie-parser");

const error = require("../middlewares/error");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser("some_secret_1234"));

  app.use("/register", register);
  app.use("/auth", auth);
  app.use("/me", me);
  app.use("/cookies", cookie);
  app.use(error);
};
