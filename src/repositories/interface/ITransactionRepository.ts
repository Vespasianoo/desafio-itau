export interface Transaction {
  id?: string
  valor: number
  dataHora: Date
}

export interface ITransactionRepository {
  create(data: Transaction): Promise<Transaction>
  deleteAll(): Promise<void>
  getTransactionsFromLastSeconds(seconds: number): Promise<Transaction[]>
}
