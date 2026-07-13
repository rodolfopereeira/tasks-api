import { AuthController } from "@/controllers/AuthController.js";
import { Router } from "express";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/", authController.createAuth);

export { authRoutes };
