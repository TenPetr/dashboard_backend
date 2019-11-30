require("dotenv").config();
const express = require("express");
const app = express();

require("./startup/config")(app);
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port);

module.exports = server;
