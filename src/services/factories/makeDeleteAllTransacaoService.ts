import { ImMemoryTransacaoRepository } from '../../repositories/inMemoryTransacao.repository'
import { DeleteAllTransacaoService } from '../deleteAllTransacao.service'

export function makeDeleteAllTransacaoService() {
  const transacaoRepository = new ImMemoryTransacaoRepository()
  const deleteAllTransacaoService = new DeleteAllTransacaoService(
    transacaoRepository,
  )

  return deleteAllTransacaoService
}
