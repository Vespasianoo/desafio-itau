import { ITransactionRepository } from '../repositories/interface/ITransactionRepository'
import { TransactionCalculator } from '../utils/transactionCalculator'

interface GetStatisticsTransactionsServiceRequest {
  seconds?: number
}

interface GetStatisticsTransactionsServiceResponse {
  statistics: {
    count: number
    sum: number
    avg: number
    min: number
    max: number
  }
}

export class GetStatisticsTransactionsService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({
    seconds = 60,
  }: GetStatisticsTransactionsServiceRequest): Promise<GetStatisticsTransactionsServiceResponse> {
    const transactions =
      await this.transactionRepository.getTransactionsFromLastSeconds(seconds)

    const count = TransactionCalculator.count(transactions)
    const sum = TransactionCalculator.getSum(transactions)
    const avg = TransactionCalculator.getAverage(transactions)
    const min = TransactionCalculator.getMin(transactions)
    const max = TransactionCalculator.getMax(transactions)

    const statistics = {
      count,
      sum,
      avg,
      min,
      max,
    }

    return {
      statistics,
    }
  }
}
