import { FastifyInstance } from 'fastify'
import { createTransacaoController } from './controllers/createTransacao.controller'
import { deleteAllTransacaoController } from './controllers/deleteAllTransacao.controller'
import { getEstatisticasTransacaoController } from './controllers/getEstatisticasTransacao.controller'

export async function routes(app: FastifyInstance) {
  app.post('/transacao', createTransacaoController)
  app.delete('/transacao', deleteAllTransacaoController)
  app.get('/estatistica', getEstatisticasTransacaoController)
}
