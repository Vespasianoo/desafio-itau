import { FastifyRequest, FastifyReply } from 'fastify'

import { DeleteAllTransactionsService } from '../../services/deleteAllTransactions.service'
import { transactionRepository } from '../../db'

export async function deleteAllTransactionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteAllTransactionsService = new DeleteAllTransactionsService(
    transactionRepository,
  )

  await deleteAllTransactionsService.execute()

  return reply.status(200).send()
}
