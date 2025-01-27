import { ImMemoryTransacaoRepository } from '../../repositories/inMemoryTransacao.repository'
import { CreateTransacaoService } from '../CreateTransacao.service'

export function makeCreateTransacaoService() {
  const transacaoRepository = new ImMemoryTransacaoRepository()
  const createTransacaoService = new CreateTransacaoService(transacaoRepository)

  return createTransacaoService
}
