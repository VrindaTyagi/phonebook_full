const app = require("./app"); // Good Express application
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const morgan = require("morgan");

const server = http.createServer(app);

app.use(morgan(":method :url :status :res[header] - :response-time ms :data"));

morgan.token("data", function getId(req) {
  return JSON.stringify({
    name: req.body.name || "-",
    number: Number(req.body.number) || "-",
  });
});

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
