import { Router } from "express";
import { userRoutes } from "./user-routes.js";
import { authRoutes } from "./auth-routes.js";
import { taskRoutes } from "./task-routes.js";
import { ensureAuthorization } from "@/middlewares/ensure-authorization.js";

const routers = Router();

routers.use("/users", userRoutes);
routers.use("/auth", authRoutes);
routers.use("/tasks", ensureAuthorization, taskRoutes);

export { routers };
