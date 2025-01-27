import { FastifyInstance } from 'fastify'
import { createTransacaoController } from './controllers/createTransacao.controller'
import { deleteAllTransacaoController } from './controllers/deleteAllTransacao.controller'

export async function routes(app: FastifyInstance) {
  app.post('/transacao', createTransacaoController)
  app.delete('/transacao', deleteAllTransacaoController)
}
