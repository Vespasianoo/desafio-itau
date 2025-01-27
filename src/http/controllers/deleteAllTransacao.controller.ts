import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteAllTransacaoService } from '../../services/factories/makeDeleteAllTransacaoService'

export async function deleteAllTransacaoController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteAllTransacao = makeDeleteAllTransacaoService()

  await deleteAllTransacao.execute()

  return reply.status(200).send()
}
