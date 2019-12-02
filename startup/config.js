const express = require("express");
const config = require("config");
const cookieParser = require("cookie-parser");
//const session = require("express-session");
const corsOptions = require("../startup/cors");
const cors = require("cors");

module.exports = function(app) {
  app.use(cors(corsOptions));
  //app.use(session(config.get("sessionConfig")));
  app.use(cookieParser(config.get("cookieSecret")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
