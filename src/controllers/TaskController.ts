import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";

export class TaskController {
  async getAll(req: Request, res: Response) {
    const tasks = prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json(tasks);
  }
}
