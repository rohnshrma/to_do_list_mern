import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutesRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port :", process.env.PORT || 5000);
});
