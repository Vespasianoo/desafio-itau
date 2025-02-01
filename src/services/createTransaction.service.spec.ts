import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionRepository } from '../repositories/inMemoryTransaction.repository'
import { CreateTransactionService } from './createTransaction.service'
import { UnprocessableEntity } from './errors/unprocessableEntity'

import dayjs from 'dayjs'

let transactionRepository: InMemoryTransactionRepository
let sut: CreateTransactionService

describe('Create Transaction Service', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    sut = new CreateTransactionService(transactionRepository)
  })

  it('should be able to send a transaction', async () => {
    const { transaction } = await sut.execute({
      valor: 2002,
      dataHora: new Date('2025-01-26T18:30:00Z'),
    })

    expect(transaction.id).toEqual(expect.any(String))
  })

  it('should not be able to send a transaction with a negative value', async () => {
    await expect(() =>
      sut.execute({
        valor: -1,
        dataHora: new Date(),
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntity)
  })

  it('should not be able to send a transaction with a datetime greater than the current', async () => {
    const futureDateTime = dayjs(new Date()).add(1, 'second').toDate()

    await expect(() =>
      sut.execute({
        valor: 2002,
        dataHora: futureDateTime,
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntity)
  })
})
