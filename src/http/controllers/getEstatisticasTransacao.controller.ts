import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetEstatisticasService } from '../../services/factories/makeGetEstatisticasService'
import z from 'zod'

export async function getEstatisticasTransacaoController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEstatisticasTransacaoBodySchema = z.object({
    seconds: z.optional(z.number().default(60)),
  })

  const _req = getEstatisticasTransacaoBodySchema.safeParse(request.body)

  let seconds = 60

  if (_req.success === true) {
    seconds = _req.data.seconds
  }

  const getEstatisticasService = makeGetEstatisticasService()

  const { estatisticas } = await getEstatisticasService.execute({ seconds })

  return reply.status(200).send({
    estatisticas,
  })
}
