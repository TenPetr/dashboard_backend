const register = require("../routes/register");
const auth = require("../routes/auth");
const me = require("../routes/me");

const error = require("../middlewares/error");

module.exports = function(app) {
  app.use("/register", register);
  app.use("/auth", auth);
  app.use("/me", me);
  app.use(error);
};
