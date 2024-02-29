import app from "./index.js";
import connectDB from "./Database/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

async function start() {
  await connectDB(process.env.MONGO_URL);
  app.listen(3000, () => {
    console.log("Server is listening at 3000");
  });
}
start();
