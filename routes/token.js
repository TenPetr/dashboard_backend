const express = require("express");
const router = express.Router();
const config = require("config");

const { User } = require("../models/user");

router.get("/", async (req, res) => {
  let user = await User.findOne({ username: req.query.username });
  if (!user) return res.status(400).send("Error, cannot find username.");

  if (req.signedCookies.rft === user.refreshToken) {
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", user.generateToken(), config.get("CookieConfig"));
    res.cookie("rft", refreshToken, config.get("CookieCongifRft"));

    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
});

module.exports = router;
