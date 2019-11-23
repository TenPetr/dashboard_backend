const express = require("express");
const router = express.Router();
const config = require("config");
const fetch = require("node-fetch");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const params = `?lat=${req.query.lat}&lon=${req.query.lon}&units=metric`;
  const apiKey = `&appid=${config.get("weatherAPIKey")}`;

  const result = await fetch(url + params + apiKey);
  const data = await result.json();

  if (data.cod != "200")
    return res.status(200).send({ status: 404, message: "City not found." });

  const weather = {
    city: data.name,
    temp: data.main.temp,
    min_temp: data.main.temp_min,
    max_temp: data.main.temp_max,
    humi: data.main.humidity,
    desc: data.weather[0].description,
    icon: data.weather[0].icon
  };

  res.status(200).send(weather);
});

module.exports = router;
