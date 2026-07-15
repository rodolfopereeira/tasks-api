import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(6).trim(),
  description: z.string().min(6).trim(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
