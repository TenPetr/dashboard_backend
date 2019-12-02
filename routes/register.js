const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("config");

const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).send("Email is already taken.");

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username is already taken.");

  user = new User(_.pick(req.body, ["username", "email", "password"]));
  user.password = await bcrypt.hash(user.password, 10);

  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("jwt", user.generateToken(), config.get("CookieConfig"));
  res.cookie("rft", user.generateRefreshToken(), config.get("CookieCongifRft"));

  res.send({ username: user.username });
});

module.exports = router;
