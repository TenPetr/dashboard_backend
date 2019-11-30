const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  console.log(req.signedCookies);
  const token = req.session.jwt;

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
};
