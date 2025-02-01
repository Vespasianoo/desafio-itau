import { Transaction } from '../repositories/interface/ITransactionRepository'

export class TransactionCalculator {
  static getSum(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => acc + transaction.valor, 0)
  }

  static getAverage(transactions: Transaction[]) {
    if (transactions.length === 0) return 0
    return this.getSum(transactions) / transactions.length
  }

  static getMax(transactions: Transaction[]) {
    if (transactions.length === 0) return 0
    return Math.max(...transactions.map((transaction) => transaction.valor))
  }

  static getMin(transactions: Transaction[]) {
    if (transactions.length === 0) return 0
    return Math.min(...transactions.map((transaction) => transaction.valor))
  }

  static count(transactions: Transaction[]) {
    return transactions.length
  }
}
