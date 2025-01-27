import { FastifyInstance } from 'fastify'
import { createTransacaoController } from './controllers/createTransacao.controller'

export async function routes(app: FastifyInstance) {
  app.post('/transacao', createTransacaoController)
}
