const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { validate } = require("../models/auth");
const { User } = require("../models/register");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User does not exist.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password.");

  const token = user.generateToken();
  res.header("x-auth-token", token).send(_.pick(user, ["username"]));
});

module.exports = router;
