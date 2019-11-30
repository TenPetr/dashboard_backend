const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("config");

const { validate } = require("../models/auth");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User does not exist.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Wrong password.");

  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  req.session.jwt = user.generateToken();
  req.session.username = user.username;

  res.cookie("refreshToken", refreshToken, config.get("CookieCongifRft"));
  res.cookie("test", "test");
  res.send({ username: user.username });
});

router.post("/logout", async (req, res) => {
  req.session.destroy();

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Error");

  user.refreshToken = "";
  await user.save();

  res.clearCookie("refreshToken");
  res.clearCookie("connect.sid");

  res.send("Logged out.");
});

router.get("/islogged", async (req, res) => {
  if (req.session.jwt) return res.json(true);
  return res.json(false);
});

module.exports = router;
