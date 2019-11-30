const express = require("express");
const router = express.Router();
const config = require("config");

const { User } = require("../models/user");

router.get("/", async (req, res) => {
  console.log("/token", req.session);
  let user = await User.findOne({ username: req.session.username });
  if (!user) return res.status(400).send("Error, cannot find username.");

  if (req.signedCookies.refreshToken === user.refreshToken) {
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    req.session.jwt = user.generateToken();
    res.cookie("refreshToken", refreshToken, config.get("CookieCongifRft"));

    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
});

module.exports = router;
