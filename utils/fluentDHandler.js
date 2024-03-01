import * as fs from "fs";
import fluentLogger from "fluent-logger";
import { log } from "console";

// Configure Fluentd logger

export default async function fluentLog() {
  fluentLogger.configure("pratik", {
    host: "localhost",
    port: "24224",
    timeout: 3.0,
    reconnectInterval: 600000, // 10 minutes
  });

  //   // Read the log file
  const logFilePath = "error.log"; // Replace with the path to your log file

  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading log file: ${err.message}`);
      return;
    }
    const split_data = data.split("\r\n");
    split_data.forEach((raj) => {
      // Send the log file contents to Fluentd
      fluentLogger.emit("image1", { raj });
    });

    console.log(`Log file contents sent to Fluentd.`);
  });
}
