import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variebles', _env.error.format())

  throw new Error('Invalid environment variebles')
}

export const env = _env.data
