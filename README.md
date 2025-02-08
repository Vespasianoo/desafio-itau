
# API DE TRANSAÇÕES

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Vespasianoo/desafio-itau.git
```

Entre no diretório do projeto

```bash
  docker compose up --build -d
```

## Documentação da API

#### Lançamento/criação de uma transação

```http
  POST /transacao
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `valor` | `number` | **Obrigatório**. Valor da transação |
| `dataHora` | `date` | **Obrigatório**. Data e hora da transação (formato ISO 8601: YYYY-MM-DDTHH:mm:ss.sssZ).  A data não pode ser no futuro. |

#### Retornado estatísticas

```http
  GET /estatistica/${seconds}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `seconds`      | `number` | **Opcional**. Por padrão serão retornado as estatísticas dos últimos 60 segundos |


#### Deletando todas as transações

```http
  DELETE /transacao/
```
## Rodando os testes

Para rodar os testes, execute o seguinte comando:

```bash
  npm run test
```