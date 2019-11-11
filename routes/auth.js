const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { validate } = require("../models/auth");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User does not exist.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Wrong password.");

  const token = user.generateToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  res.send({
    token: token,
    refreshToken: refreshToken,
    username: user.username
  });
});

router.post("/token", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(404).send("User not found. Cannot authorize");

  if (user.refreshToken === req.body.refreshToken)
    return res.send(user.generateToken());
  return res.status(401).send("Unauthorized");
});

module.exports = router;
