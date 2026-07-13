import { TaskController } from "@/controllers/TaskController.js";
import { ensureAuthorization } from "@/middlewares/ensure-authorization.js";
import { Router } from "express";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.get("/", ensureAuthorization, taskController.getAll);

export { taskRoutes };
