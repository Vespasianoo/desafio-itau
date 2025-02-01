import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionRepository } from '../repositories/inMemoryTransaction.repository'
import { DeleteAllTransactionsService } from './deleteAllTransactions.service'

let transactionRepository: InMemoryTransactionRepository
let sut: DeleteAllTransactionsService

describe('Delete All Transactions Service', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    sut = new DeleteAllTransactionsService(transactionRepository)
  })

  it('should be able delete all transaction', async () => {
    transactionRepository.create({
      valor: 2002,
      dataHora: new Date('2025-01-26T18:30:00Z'),
    })

    await expect(sut.execute()).resolves.toBeUndefined()

    expect(transactionRepository.items).toHaveLength(0)
  })
})
