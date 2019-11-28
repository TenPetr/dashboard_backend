const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");

const { User, validatePassword } = require("../models/user");

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) return res.status(400).json("User not found.");

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!validPassword) return res.json("Wrong password.");

  const { error } = validatePassword(req.body.newPassword);
  if (error) return res.json(error.details[0].message);

  user.password = await bcrypt.hash(req.body.newPassword, 10);
  await user.save();

  res.status(200).json("Password changed.");
});

module.exports = router;
