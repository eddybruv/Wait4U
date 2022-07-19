import express from "express";
import chats from "./data/data";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/chats", async (req, res) => {
  res.json(chats)
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`😏[server]: Running on Port ${PORT}`);
});