const cors = require("cors");

module.exports = function(app) {
  const corsOptions = {
    allowedHeaders: [
      "Origin",
      "No-Auth",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "x-auth-token"
    ],
    credentials: true,
    methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
};
