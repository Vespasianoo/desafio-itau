import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateTransacaoService } from '../../services/factories/makeCreateTransacaoService'
import { UnprocessableEntity } from '../../services/errors/unprocessableEntity'

export async function createTransacaoController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTransacaoBodySchema = z.object({
    valor: z.number(),
    dataHora: z.coerce.date(),
  })

  const { valor, dataHora } = createTransacaoBodySchema.parse(request.body)

  try {
    const createTransacaoService = makeCreateTransacaoService()

    await createTransacaoService.execute({
      valor,
      dataHora,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UnprocessableEntity) {
      return reply.status(422).send()
    }

    throw error
  }
}
