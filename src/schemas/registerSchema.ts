import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Informe pelo menos 2 caracteres no nome.')
      .max(120, 'Nome muito longo.'),
    email: z.string().trim().email('Digite um email valido.'),
    password: z
      .string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres.')
      .max(100, 'A senha excedeu o tamanho permitido.'),
    confirmPassword: z.string().min(6, 'Confirme a senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais.',
    path: ['confirmPassword'],
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>
