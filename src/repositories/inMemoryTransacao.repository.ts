import { randomUUID } from 'node:crypto'
import {
  ITransacaoRepository,
  Transacao,
} from './interface/ITransacaoRepository'

export class ImMemoryTransacaoRepository implements ITransacaoRepository {
  public items: Transacao[] = []

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
