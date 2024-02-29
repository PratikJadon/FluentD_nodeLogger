import * as fs from "fs";
import fluentLogger from "fluent-logger";
import logger from "./logger.js";

export default async function fluentLog() {
    logger.info("Inside the fluentLog function");
  fluentLogger.configure("pratik", {
    host: "localhost",
    port: "24224",
    timeout: 3.0,
    reconnectInterval: 600000, // 10 minutes
  });

  // Read the log file
  const logFilePath = "error.log"; 

  // Check the size of the log file
  fs.stat(logFilePath, (err, stats) => {
    if (err) {
      console.error(`Error getting file stats: ${err.message}`);
      return;
    }

    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
    console.log(fileSizeInKB);
    if (fileSizeInKB > 2) {
      fs.readFile(logFilePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading log file: ${err.message}`);
          return;
        }

        const split_data = data.split("\r\n");
        // Emit each log entry to FluentD separately
        split_data.forEach((logEntry) => {
          fluentLogger.emit("image1", { log: logEntry }, (error) => {
            if (error) {
              console.error(`Error sending log to FluentD: ${error.message}`);
              return;
            }
            console.log("Log sent to FluentD:", logEntry);
          });
        });

        // Clear the log file only if logs were successfully sent
        fs.writeFile(logFilePath, "", (err) => {
          if (err) {
            console.error(`Error clearing log file: ${err.message}`);
            return;
          }
          console.log("Log file cleared.");
        });
      });
    } else {
      console.log("Log file size is below 10KB, no action required.");
      logger.info("Log file size is below 10KB, no action required.");
    }
  });
}
