const register = require("../routes/register");
const auth = require("../routes/auth");
const me = require("../routes/me");
const token = require("../routes/token");

const error = require("../middlewares/error");

module.exports = function(app) {
  app.use("/register", register);
  app.use("/auth", auth);
  app.use("/token", token);
  app.use("/me", me);
  app.use(error);
};
