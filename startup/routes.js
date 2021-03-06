const register = require("../routes/register");
const auth = require("../routes/auth");
const me = require("../routes/me");
const token = require("../routes/token");
const weather = require("../routes/weather");
const calendar = require("../routes/calendar");
const error = require("../middlewares/error");
const change = require("../routes/change");
const news = require("../routes/news");

module.exports = function(app) {
  app.use("/register", register);
  app.use("/auth", auth);
  app.use("/token", token);
  app.use("/me", me);
  app.use("/weather", weather);
  app.use("/calendar", calendar);
  app.use("/change", change);
  app.use("/news", news);
  app.use(error);
};
