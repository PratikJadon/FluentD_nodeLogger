// logger.js
import winston from "winston";

// Define the logger configuration
const logger = winston.createLogger({
  level: "info", // Set the logging level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "error.log", level: "info" }), // Log errors to a file
  ],
});

export default logger;
