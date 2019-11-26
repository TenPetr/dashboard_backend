const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");
const auth = require("../middlewares/auth");

const { User, validatePassword } = require("../models/user");

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) return res.status(400).send("User not found.");

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!validPassword) return res.status(400).send("Wrong password.");

  const { error } = validatePassword(req.body.newPassword);
  if (error) return res.status(400).send(error.details[0].message);

  user.password = await bcrypt.hash(req.body.newPassword, 10);
  await user.save();

  res.status(200).send("Password changed");
});

module.exports = router;
