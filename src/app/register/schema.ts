import * as z from "zod";

export const schema = z
  .object({
    name: z.string().min(3, { message: "Nome completo é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    nickname: z
      .string()
      .min(3, { message: "Nome de usuário deve ter pelo menos 3 caracteres" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    passwordConfirmation: z.string().min(6, {
      message: "A confirmação da senha deve ter pelo menos 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não correspondem",
    path: ["passwordConfirmation"],
  });