require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const config = require("config");
const session = require("express-session");

app.use(session(config.get("sessionConfig")));
app.use(cookieParser(config.get("cookie")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./startup/cors")(app);
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || 3000;
const server = app.listen(port);

module.exports = server;
