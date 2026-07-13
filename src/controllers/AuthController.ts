import { prisma } from "@/database/prisma.js";
import { loginUserSchema } from "@/schemas/login-user-schema.js";
import { AppError } from "@/utils/AppError.js";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
  async createAuth(req: Request, res: Response) {
    const { email, password } = loginUserSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Email ou senha inválido!", 401);
    }

    const isMatchPassword = await compare(user.password, password);

    if (isMatchPassword) {
      throw new AppError("Email ou senha inválido!", 401);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      String(process.env.SECRET),
      {
        subject: user.id,
        expiresIn: "1h",
      },
    );

    res.status(201).json({ token });
  }
}
