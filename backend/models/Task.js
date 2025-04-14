import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: Date,
  priority: { type: String, required: true },
  completed: { type: Boolean, default: false },
  repeat: {
    type: String,
    enum: ["none", "daily", "weekly", "monthly"],
    default: "none",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
