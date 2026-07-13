import { UserCreateSchema } from "@/schemas/user-create-schemas.js";
import { Request, Response } from "express";
import { hash } from "bcrypt";
import { prisma } from "@/db/prisma.js";
import { AppError } from "@/utils/AppError.js";

export class UserController {
  async create(req: Request, res: Response) {
    const body: UserCreateSchema = req.body;

    const { username, email, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new AppError("Usuarios existente", 400);
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({});
  }
}
