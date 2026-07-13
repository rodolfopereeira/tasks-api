import z, { email } from "zod";

const createUserShchemas = z.object({
  username: z.string().min(3).trim(),
  email: z.email(),
  password: z.string().min(6),
});

export type UserCreateSchema = z.infer<typeof createUserShchemas>;
