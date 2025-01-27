import { beforeEach, describe, expect, it } from 'vitest'
import { ImMemoryTransacaoRepository } from '../repositories/inMemoryTransacao.repository'
import { DeleteAllTransacaoService } from './deleteAllTransacao.service'

let transacaoRepository: ImMemoryTransacaoRepository
let sut: DeleteAllTransacaoService

describe('Delete All Transacao Service', () => {
  beforeEach(() => {
    transacaoRepository = new ImMemoryTransacaoRepository()
    sut = new DeleteAllTransacaoService(transacaoRepository)
  })

  it('should be able delete all transaction', async () => {
    transacaoRepository.create({
      valor: 2002,
      dataHora: new Date('2025-01-26T18:30:00Z'),
    })

    await expect(sut.execute()).resolves.toBeUndefined()

    expect(transacaoRepository.items).toHaveLength(0)
  })
})
