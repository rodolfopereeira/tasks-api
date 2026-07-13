import { Router } from "express";
import { userRoutes } from "./user-routes.js";

const routers = Router();

routers.use("/users", userRoutes);

export { routers };
