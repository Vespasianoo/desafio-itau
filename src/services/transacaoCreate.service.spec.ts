import { beforeEach, describe, expect, it } from 'vitest'
import { ImMemoryTransacaoRepository } from '../repositories/inMemoryTransacao.repository'
import { CreateTransacaoService } from './transacaoCreate.service'
import { UnprocessableEntity } from './errors/unprocessableEntity'

import dayjs from 'dayjs'

let transacaoRepository: ImMemoryTransacaoRepository
let sut: CreateTransacaoService

describe('Transacao Service', () => {
  beforeEach(() => {
    transacaoRepository = new ImMemoryTransacaoRepository()
    sut = new CreateTransacaoService(transacaoRepository)
  })

  it('should  be able to send a transaction', async () => {
    const { transacao } = await sut.execute({
      valor: 2002,
      dataHora: new Date(),
    })

    expect(transacao.id).toEqual(expect.any(String))
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
    const futureDateTime = dayjs(new Date()).add(1, 'day').toDate()

    await expect(() =>
      sut.execute({
        valor: 2002,
        dataHora: futureDateTime,
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntity)
  })
})
