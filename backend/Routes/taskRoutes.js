import express from "express";
import {
  createTask,
  updateTask,
  getTasks,
  deleteTask,
} from "../controllers/taskController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createTask);
router.get("/", authenticateUser, getTasks);
router.put("/:id", authenticateUser, updateTask);
router.delete("/:id", authenticateUser, deleteTask);

export default router;
