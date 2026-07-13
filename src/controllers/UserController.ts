import { Request, Response } from "express";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/AppError.js";
import { createUserSchema } from "@/schemas/user-create-schemas.js";

export class UserController {
  async create(req: Request, res: Response) {
    const { username, email, password } = createUserSchema.parse(req.body);

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
