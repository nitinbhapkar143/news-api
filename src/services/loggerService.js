const winston = require('winston');

//logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: 'logs/combined.log' }), // Log all levels to a file
  ],
});

module.exports = logger;
