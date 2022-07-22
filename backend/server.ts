import { errorHandler, notFound } from "./middleware/errorMiddleware";
import express from "express";
import connectDB from "./config/db";
import chats from "./data/data";
import UserRouter from "./routes/user.route";
import ChatRouter from "./routes/chat.route";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRouter);
app.use("/api/chat", ChatRouter)
app.use(notFound);
app.use(errorHandler);

connectDB;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`😏[server]: Running on Port ${PORT}`);
});
