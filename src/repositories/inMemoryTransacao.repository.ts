import { randomUUID } from 'node:crypto'
import {
  ITransacaoRepository,
  Transacao,
} from './interface/ITransacaoRepository'

import dayjs from 'dayjs'

export class ImMemoryTransacaoRepository implements ITransacaoRepository {
  public items: Transacao[] = []

  async getTransacoesFromLastSeconds(seconds) {
    const transacaoes = this.items.filter((transacao) => {
      const distanceInsecondsFromtransactionCreation = dayjs(new Date()).diff(
        transacao.dataHora,
        'seconds',
      )

      return distanceInsecondsFromtransactionCreation < seconds
    })

    return transacaoes
  }

  async create(data: Transacao) {
    const Transacao = {
      id: data.id ?? randomUUID(),
      valor: data.valor,
      dataHora: data.dataHora,
    }

    this.items.push(Transacao)

    return Transacao
  }

  async deleteAll() {
    this.items = []
  }
}
