import { AppError } from "@/utils/AppError.js";
import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    res.status(error.statusCoder).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    res
      .status(401)
      .json({ message: "validate error", issue: z.formatError(error) });
  }

  res.status(500).json({ message: error.message });
}
