import { ITransacaoRepository } from '../repositories/interface/ITransacaoRepository'

export class DeleteAllTransacaoService {
  constructor(private transacaoRepository: ITransacaoRepository) {}

  async execute() {
    this.transacaoRepository.deleteAll()
  }
}
