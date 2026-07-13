import { AppError } from "@/utils/AppError.js";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureAuthorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const auhtHeader = req.headers.authorization;

    if (!auhtHeader) {
      throw new AppError("JWT Token not foud", 401);
    }

    const [, token] = auhtHeader?.split(" ");

    const { role, sub: id } = jwt.verify(
      token,
      String(process.env.SECRET),
    ) as TokenPayload;

    req.user = {
      id,
      role,
    };

    return next();
  } catch (e) {
    throw new AppError("Invalid JWT token", 401);
  }
}
