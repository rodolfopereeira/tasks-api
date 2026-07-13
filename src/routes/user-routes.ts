import { UserController } from "@/controllers/UserController.js";
import { Router } from "express";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);

export { userRoutes };
