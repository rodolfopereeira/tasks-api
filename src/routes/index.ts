import { Router } from "express";
import { userRoutes } from "./user-routes.js";
import { authRoutes } from "./auth-routes.js";
import { taskRoutes } from "./task-routes.js";

const routers = Router();

routers.use("/users", userRoutes);
routers.use("/auth", authRoutes);
routers.use("/tasks", taskRoutes);

export { routers };
