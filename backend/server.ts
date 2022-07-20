import express from "express";
import connectDB from "./config/db";
import chats from "./data/data";
import UserRouter from "./routes/user.route"

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', UserRouter)


connectDB;
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`😏[server]: Running on Port ${PORT}`);
});