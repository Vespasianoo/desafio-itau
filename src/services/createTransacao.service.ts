import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'

import {
  ITransacaoRepository,
  Transacao,
} from '../repositories/interface/ITransacaoRepository'
import { UnprocessableEntity } from './errors/unprocessableEntity'

dayjs.extend(utc)
// dayjs.extend(timezone)

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

    const dataHoraRequest = dayjs(new Date(dataHora))
    const currentDateTime = dayjs(new Date()).utc(true)

    const isDateAfterCurrentDate = dataHoraRequest.isAfter(currentDateTime)

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
