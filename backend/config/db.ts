import mongoose from "mongoose";
require("dotenv").config();


const connectDB = mongoose
  // @ts-ignore
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("🤌[Database]: Up and Running");
  })
  .catch(() => console.log("🥲[Database]: Not connected"));

export default connectDB