import app from "./index.js";
import connectDB from "./Database/connectDB.js";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import fluentLog from "./utils/fluentDHandler.js";

dotenv.config();

async function start() {
  await connectDB(process.env.MONGO_URL);
  app.listen(3000, () => {
    logger.info("Server started at port 3000");
    console.log("Server is listening at 3000");
  });
}
start();

setTimeout(() => {
  fluentLog("RAJ2");
}, 2000);
