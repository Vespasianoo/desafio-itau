export interface Transacao {
  id?: string
  valor: number
  dataHora: Date
}

export interface ITransacaoRepository {
  create(data: Transacao): Promise<Transacao>
  deleteAll(): Promise<void>
}
