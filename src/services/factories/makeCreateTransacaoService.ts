import { ImMemoryTransacaoRepository } from '../../repositories/inMemoryTransacao.repository'
import { CreateTransacaoService } from '../createTransacao.service'

export function makeCreateTransacaoService() {
  const transacaoRepository = new ImMemoryTransacaoRepository()
  const createTransacaoService = new CreateTransacaoService(transacaoRepository)

  return createTransacaoService
}
