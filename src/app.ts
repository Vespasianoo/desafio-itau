import fastify from 'fastify'
import { routes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send()
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // aq a gente deveria fazer o log para uma ferramenta extarna
  }

  return reply.status(400).send()
})
