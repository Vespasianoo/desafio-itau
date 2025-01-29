import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ImMemoryTransacaoRepository } from '../repositories/inMemoryTransacao.repository'
import { GetEstatisticasService } from './getEstatisticas.service'

let transacaoRepository: ImMemoryTransacaoRepository
let sut: GetEstatisticasService

describe('Get Estatisticas Transacao Service', () => {
  beforeEach(() => {
    transacaoRepository = new ImMemoryTransacaoRepository()
    sut = new GetEstatisticasService(transacaoRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get the statistics', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 9, 40, 30))

    transacaoRepository.create({
      valor: 50,
      dataHora: new Date(2024, 0, 1, 9, 40, 29), // 1 segundos de distância para o horário atual
    })

    transacaoRepository.create({
      valor: 100,
      dataHora: new Date(2024, 0, 1, 9, 40, 25), // 5 segundos de distância para o horário atual
    })

    transacaoRepository.create({
      valor: 10,
      dataHora: new Date(2024, 0, 1, 9, 39, 25), // 65 segundos de distância para o horário atual
    })

    const seconds = 60

    const { estatisticas } = await sut.execute({ seconds })

    expect(estatisticas).toEqual({
      count: 2, // Apenas as 2 primeiras transações estão dentro do intervalo
      sum: 150, // Soma de 50 + 100
      avg: 75, // Média: 150 / 2
      min: 50, // Menor valor: 50
      max: 100, // Maior valor: 100
    })
  })

  it('should be able to get statistics with zero value when there are no transactions ', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 9, 40, 30))

    const seconds = 60

    const { estatisticas } = await sut.execute({ seconds })

    expect(estatisticas).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    })
  })
})
