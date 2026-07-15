import { prisma } from "@/database/prisma.js";
import { createTaskSchema } from "@/schemas/create-task-schemas.js";
import { AppError } from "@/utils/AppError.js";
import { Request, Response } from "express";
import { string } from "zod";

export class TaskController {
  async getAll(req: Request, res: Response) {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(tasks);
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id as string;

    const task = await prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            password: false,
          },
        },
      },
    });

    if (!task) {
      throw new AppError("Task Not found!", 404);
    }

    res.status(200).json(task);
  }

  async createTask(req: Request, res: Response) {
    const { title, description } = createTaskSchema.parse(req.body);
    try {
      await prisma.task.create({
        data: {
          title,
          description,
          userId: req.user.id,
        },
      });
      return res.status(201).json();
    } catch (e) {
      throw new AppError("Task Invalida!", 404);
    }
  }

  async deleteTask(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      await prisma.task.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({});
    } catch (e) {
      throw new AppError("Task Not Found!", 401);
    }
  }
}
