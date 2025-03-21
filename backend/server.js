import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
dotenv.config();
const app = express();

connectDB();

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port :", process.env.PORT || 5000);
});
