import express from "express";
//Routes
import userRouter from "./Routes/userRoutes.js";

const app = express();

app.use("/api/users", userRouter);

export default app;
