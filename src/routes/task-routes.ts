import { TaskController } from "@/controllers/TaskController.js";
import { Router } from "express";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.get("/", taskController.getAll);
taskRoutes.post("/", taskController.createTask);
taskRoutes.get("/:id", taskController.findById);
taskRoutes.delete("/:id", taskController.deleteTask);

export { taskRoutes };
