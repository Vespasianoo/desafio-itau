import { ImMemoryTransacaoRepository } from '../../repositories/inMemoryTransacao.repository'
import { GetEstatisticasService } from '../getEstatisticas.service'

export function makeGetEstatisticasService() {
  const transacaoRepository = new ImMemoryTransacaoRepository()
  const getEstatisticasService = new GetEstatisticasService(transacaoRepository)

  return getEstatisticasService
}
