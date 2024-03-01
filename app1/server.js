import app from "./index.js";
import connectDB from "./Database/connectDB.js";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import fluentLog from "./utils/fluentDHandler.js";

dotenv.config();

const port = 3000;

async function start() {
  await connectDB(process.env.MONGO_URL);
  app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
    console.log(`Server is listening at ${port}`);
  });
}
start();

setInterval(fluentLog, 2000);
