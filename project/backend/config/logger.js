// Path: config\logger.js
const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: "right meow!" }), timestamp(), myFormat),
  transports: [new transports.Console()],
  write: (raw) => console.log("stream msg>>>", raw.toString()),
});

module.exports = logger;
