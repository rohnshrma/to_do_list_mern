// Import the Task model from the models directory
import Task from "../models/Task.js";

// Controller function to create a new task
export const createTask = async (req, res) => {
  try {
    // Destructure task details from the request body
    const { title, description, dueDate, priority, repeat } = req.body;

    // Create a new task in the database
    // 'await' is used because Task.create() is an asynchronous operation
    const task = await Task.create({
      title, // Task title
      description, // Task description
      dueDate, // Task due date
      priority, // Task priority (e.g., low, medium, high)
      repeat, // Task repetition settings (e.g., daily, weekly)
      userId: req.userId, // Associate the task with the logged-in user (userId must be set in authentication middleware)
    });

    // Send a response with status 201 (Created) and return the created task
    res.status(201).json({ task });
  } catch (error) {
    // Handle errors and return a 500 (Internal Server Error) response
    res.status(500).json({ message: "Server Error", error });
  }
};

// Controller function to fetch all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    // Retrieve all tasks associated with the logged-in user from the database
    const tasks = await Task.find({ userId: req.userId });

    // Send a response with status 200 (OK) and return the list of tasks
    res.status(200).json({ tasks });
  } catch (error) {
    // Handle errors and return a 500 (Internal Server Error) response
    res.status(500).json({ message: "Server Error", error });
  }
};

// Controller function to update an existing task
export const updateTask = async (req, res) => {
  try {
    // Find the task by its ID from request parameters
    const task = await Task.findById(req.params.id);

    // If task is not found, return a 404 (Not Found) response
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Check if the logged-in user is the owner of the task
    if (task.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    // Update the task properties with new values from request body
    Object.assign(task, req.body);

    // Save the updated task in the database
    await task.save();

    // Send a response with status 200 (OK) and a success message
    res.status(200).json({ message: "Task Updated", task });
  } catch (error) {
    // Handle errors and return a 500 (Internal Server Error) response
    res.status(500).json({ message: "Server Error", error });
  }
};

// Controller function to delete a task
export const deleteTask = async (req, res) => {
  try {
    // Find the task by its ID from request parameters
    const task = await Task.findById(req.params.id);

    // If task is not found, return a 404 (Not Found) response
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Check if the logged-in user is the owner of the task
    if (task.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    // Delete the task from the database
    await task.deleteOne();

    // Send a response with status 200 (OK) and a success message
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    // Handle errors and return a 500 (Internal Server Error) response
    res.status(500).json({ message: "Server Error", error });
  }
};
