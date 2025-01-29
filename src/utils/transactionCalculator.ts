import { Transacao } from '../repositories/interface/ITransacaoRepository'

export class TransactionCalculator {
  static getSum(transacoes: Transacao[]) {
    return transacoes.reduce((acc, transacao) => acc + transacao.valor, 0)
  }

  static getAverage(transacoes: Transacao[]) {
    if (transacoes.length === 0) return 0
    return this.getSum(transacoes) / transacoes.length
  }

  static getMax(transacoes: Transacao[]) {
    if (transacoes.length === 0) return 0
    return Math.max(...transacoes.map((transacao) => transacao.valor))
  }

  static getMin(transacoes: Transacao[]) {
    if (transacoes.length === 0) return 0
    return Math.min(...transacoes.map((transacao) => transacao.valor))
  }
}
