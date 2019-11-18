const cors = require("cors");
const config = require("config");

module.exports = function(app) {
  const corsOptions = {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "No-Auth"
    ],
    credentials: true, // allows cookies
    methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
    origin: config.get("origin"), // cannot put * wildcard when using cookies (credentials)
    preflightContinue: false,
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
};
