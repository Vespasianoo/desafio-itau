import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {
  ITransactionRepository,
  Transaction,
} from '../repositories/interface/ITransactionRepository'
import { UnprocessableEntity } from './errors/unprocessableEntity'

dayjs.extend(utc)

interface CreateTransactionRequest {
  valor: number
  dataHora: Date
}

interface CreateTransactionServiceResponse {
  transaction: Transaction
}

export class CreateTransactionService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({
    valor,
    dataHora,
  }: CreateTransactionRequest): Promise<CreateTransactionServiceResponse> {
    const isPositive = valor >= 0

    const dataHoraRequest = dayjs(new Date(dataHora))
    const currentDateTime = dayjs().utc(true)

    const isDateAfterCurrentDate = dataHoraRequest.isAfter(currentDateTime)

    if (!isPositive || isDateAfterCurrentDate) {
      throw new UnprocessableEntity()
    }

    const transaction = await this.transactionRepository.create({
      valor,
      dataHora,
    })

    return {
      transaction,
    }
  }
}
