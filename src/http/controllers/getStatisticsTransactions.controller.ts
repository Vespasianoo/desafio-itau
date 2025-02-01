import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

import { GetStatisticsTransactionsService } from '../../services/getStatisticsTransactions.service'
import { transactionRepository } from '../../db'

export async function getStatisticsTransactionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEstatisticasTransacaoParamsSchema = z.object({
    seconds: z.coerce.number().default(60),
  })

  const { seconds } = getEstatisticasTransacaoParamsSchema.parse(request.params)

  const getStatisticsService = new GetStatisticsTransactionsService(
    transactionRepository,
  )

  const { statistics } = await getStatisticsService.execute({ seconds })

  return reply.status(200).send({
    statistics,
  })
}
