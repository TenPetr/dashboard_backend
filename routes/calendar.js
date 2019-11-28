const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  const url = `http://svatky.adresa.info/json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
