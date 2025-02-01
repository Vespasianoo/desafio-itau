import { randomUUID } from 'node:crypto'
import {
  ITransactionRepository,
  Transaction,
} from './interface/ITransactionRepository'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export class InMemoryTransactionRepository implements ITransactionRepository {
  public items: Transaction[] = []

  async getTransactionsFromLastSeconds(seconds: number) {
    const transactions = this.items.filter((transaction) => {
      const distanceInsecondsFromtransactionCreation = dayjs()
        .utc(true)
        .diff(transaction.dataHora, 'seconds')

      return distanceInsecondsFromtransactionCreation <= seconds
    })

    return transactions
  }

  async create(data: Transaction) {
    const transaction = {
      id: data.id ?? randomUUID(),
      valor: data.valor,
      dataHora: data.dataHora,
    }

    this.items.push(transaction)

    return transaction
  }

  async deleteAll() {
    this.items = []
  }
}
