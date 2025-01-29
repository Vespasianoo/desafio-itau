import { ITransacaoRepository } from '../repositories/interface/ITransacaoRepository'
import { TransactionCalculator } from '../utils/transactionCalculator'

interface GetEstatisticasServiceRequest {
  seconds?: number
}

interface GetEstatisticasServiceResponse {
  estatisticas: {
    count: number
    sum: number
    avg: number
    min: number
    max: number
  }
}

export class GetEstatisticasService {
  constructor(private transacaoRepository: ITransacaoRepository) {}

  async execute({
    seconds = 60,
  }: GetEstatisticasServiceRequest): Promise<GetEstatisticasServiceResponse> {
    const transacoes =
      await this.transacaoRepository.getTransacoesFromLastSeconds(seconds)

    const count = transacoes.length
    const sum = TransactionCalculator.getSum(transacoes)
    const avg = TransactionCalculator.getAverage(transacoes)
    const min = TransactionCalculator.getMin(transacoes)
    const max = TransactionCalculator.getMax(transacoes)

    const estatisticas = {
      count,
      sum,
      avg,
      min,
      max,
    }

    return {
      estatisticas,
    }
  }
}
