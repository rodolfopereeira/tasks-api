import z, { email } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username 3 ou mais caracteres" })
    .trim(),
  email: z.email({ error: "Email inválido!" }),
  password: z.string().min(6, { error: "password muito pequena" }),
});

export type userCreateSchema = z.infer<typeof createUserSchema>;
