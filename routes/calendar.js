const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  const url = `http://svatky.adresa.info/json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).send(data);
  } catch (error) {
    res
      .status(200)
      .send({ status: 404, message: "External API error.", error });
  }
});

module.exports = router;
