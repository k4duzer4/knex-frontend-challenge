import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email('Digite um e-mail válido.'),
  password: z
    .string()
    .min(6, 'A senha precisa ter pelo menos 6 caracteres.')
    .max(100, 'A senha excedeu o tamanho permitido.'),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
