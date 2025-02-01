import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryTransactionRepository } from '../repositories/inMemoryTransaction.repository'
import { GetStatisticsTransactionsService } from './getStatisticsTransactions.service'

let transactionRepository: InMemoryTransactionRepository
let sut: GetStatisticsTransactionsService

describe('Get statistics transactions Service', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    sut = new GetStatisticsTransactionsService(transactionRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get the statistics', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 9, 40, 30)) // 2024-01-01 09:40:30

    transactionRepository.create({
      valor: 50,
      dataHora: new Date(Date.UTC(2024, 0, 1, 9, 40, 29)), // 2024-01-01 09:40:29  1 segundos de distância para o horário atual
    })

    transactionRepository.create({
      valor: 100,
      dataHora: new Date(Date.UTC(2024, 0, 1, 9, 40, 25)), // 2024-01-01 09:40:25 5 segundos de distância para o horário atual
    })

    transactionRepository.create({
      valor: 10,
      dataHora: new Date(Date.UTC(2024, 0, 1, 9, 39, 25)), // 2024-01-01 09:39:25 65 segundos de distância para o horário atual
    })

    const seconds = 60

    const { statistics } = await sut.execute({ seconds })

    expect(statistics).toEqual({
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

    const { statistics } = await sut.execute({ seconds })

    expect(statistics).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    })
  })

  it('should include transactions exactly at the seconds limit', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 9, 40, 30)) // 2024-01-01 09:40:30

    transactionRepository.create({
      valor: 200,
      dataHora: new Date(Date.UTC(2024, 0, 1, 9, 39, 30)), // Exatamente 60 segundos atrás (limite)
    })

    const result = await sut.execute({ seconds: 60 })
    expect(result.statistics.count).toBe(1)
  })
})
