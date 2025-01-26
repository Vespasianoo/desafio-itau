import dayjs from 'dayjs'
import {
  ITransacaoRepository,
  Transacao,
} from '../repositories/interface/ITransacaoRepository'
import { UnprocessableEntity } from './errors/unprocessableEntity'

interface CreateTransacaoRequest {
  valor: number
  dataHora: Date
}

interface CreateTransacaoServiceResponse {
  transacao: Transacao
}

export class CreateTransacaoService {
  constructor(private transacaoRepository: ITransacaoRepository) {}

  async execute({
    valor,
    dataHora,
  }: CreateTransacaoRequest): Promise<CreateTransacaoServiceResponse> {
    const isPositive = valor >= 0
    const isDateAfterCurrentDate = dayjs(dataHora).isAfter(new Date())

    if (!isPositive || isDateAfterCurrentDate) {
      throw new UnprocessableEntity()
    }

    const transacao = await this.transacaoRepository.create({
      valor,
      dataHora,
    })

    return {
      transacao,
    }
  }
}
