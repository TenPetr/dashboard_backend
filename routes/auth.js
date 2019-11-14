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

  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;

  const token = user.generateToken();
  await user.save();

  res.send({
    token: token,
    username: user.username,
    refreshToken: refreshToken
  });
});

router.post("/token", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User does not exist.");

  if (req.body.refreshToken == user.refreshToken) {
    // Generuje nový RF-T, který uloží do DB a pošle klientovi pro další dotazy...
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    res.send({ token: user.generateToken(), refreshToken: newRefreshToken });
  } else {
    return res.status(401).send("Unauthorized.");
  }
});

router.post("/logout", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Error");

  user.refreshToken = "";
  await user.save();

  res.send("Logged out.");
});

module.exports = router;
