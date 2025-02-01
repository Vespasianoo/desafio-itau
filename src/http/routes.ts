import { FastifyInstance } from 'fastify'
import { createTransactionController } from './controllers/createTransaction.controller'
import { deleteAllTransactionsController } from './controllers/deleteAllTransactions.controller'
import { getStatisticsTransactionsController } from './controllers/getStatisticsTransactions.controller'

export async function routes(app: FastifyInstance) {
  app.post('/transacao', createTransactionController)
  app.delete('/transacao', deleteAllTransactionsController)
  app.get('/estatistica/:seconds?', getStatisticsTransactionsController)
}
