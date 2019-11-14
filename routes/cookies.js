const express = require("express");
const router = express.Router();

const cookieConfig = {
  maxAge: 100000,
  signed: true
};

router.get("/set", (req, res) => {
  res.cookie("test", "some value", cookieConfig);
  res.send("set-cookie");
});

module.exports = router;
