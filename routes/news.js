const express = require("express");
const router = express.Router();
const config = require("config");
const fetch = require("node-fetch");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?`;
  const params = `country=cz&pageSize=10&`;
  const apiKey = `apiKey=${config.get("newsAPIKey")}`;

  const result = await fetch(url + params + apiKey);
  const articles = await result.json();

  if (articles.status != "ok") return res.status(400);

  res.status(200).json(articles);
});

module.exports = router;
