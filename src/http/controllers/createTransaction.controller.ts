import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { transactionRepository } from '../../db'
import { CreateTransactionService } from '../../services/createTransaction.service'
import { UnprocessableEntity } from '../../services/errors/unprocessableEntity'

export async function createTransactionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTransactionBodySchema = z.object({
    valor: z.number(),
    dataHora: z
      .string()
      .refine((val) => {
        const iso8601Regex =
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|([+\\-]\d{2}:\d{2}))$/
        return iso8601Regex.test(val) // Validação da data no formato ISO 8601
      })
      .transform((val) => new Date(val)), // Converte a string para um objeto Date
  })
  const { valor, dataHora } = createTransactionBodySchema.parse(request.body)
  try {
    const createTransactionService = new CreateTransactionService(
      transactionRepository,
    )

    await createTransactionService.execute({
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
