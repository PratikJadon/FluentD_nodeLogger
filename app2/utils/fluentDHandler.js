import * as fs from "fs";
import fluentLogger from "fluent-logger";
import logger from "./logger.js";

export default async function fluentLog() {
  fluentLogger.configure("raj", {
    host: "host.docker.internal",
    port: "24224",
    timeout: 3.0,
    reconnectInterval: 600000,
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

    if (fileSizeInKB > 0.5) {
      fs.readFile(logFilePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading log file: ${err.message}`);
          return;
        }

        const split_data = data.split("\n");
        // Emit each log entry to FluentD separately
        split_data.forEach((logEntry) => {
          const matchResult = logEntry.match(/\[(.*?)\]/);
          if (matchResult && matchResult[1]) {
            const logTimestamp = matchResult[1];
            const logInfo = logEntry
              .substring(
                logEntry.indexOf(matchResult[0]) + matchResult[0].length + 1
              )
              .trim();
            const formattedLog = {
              time: logTimestamp,
              log: logInfo,
            };

            fluentLogger.emit("image", formattedLog, (error) => {
              if (error) {
                console.error(`Error sending log to FluentD: ${error.message}`);
                logger.error(`Error sending log to FluentD: ${error.message}`);
                return;
              }
              console.log("Log sent to FluentD:", formattedLog);
            });
          } else {
            // console.error("Error: Log entry does not contain a valid timestamp format.");
            logger.error(
              "Error: Log entry does not contain a valid timestamp format."
            );
          }
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
      console.log(
        `Log file size is below 2KB, Current file size - ${fileSizeInKB}KB and no action is required.`
      );
    }
  });
}
