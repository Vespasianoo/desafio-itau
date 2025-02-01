import { ITransactionRepository } from '../repositories/interface/ITransactionRepository'

export class DeleteAllTransactionsService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute() {
    this.transactionRepository.deleteAll()
  }
}
