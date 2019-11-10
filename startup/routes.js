const express = require("express");
const register = require("../routes/register");
const auth = require("../routes/auth");

const error = require("../middlewares/error");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/register", register);
  app.use("/auth", auth);
  app.use(error);
};
