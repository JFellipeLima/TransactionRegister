# TSC - Transaction Service Component

Este é um projeto simples de API para gerenciamento de transações financeiras (entradas e saídas), desenvolvido com foco em boas práticas de arquitetura e tipagem.

## 🛠️ Como rodar o projeto

1. Instale as dependências:
    ```bash
    npm install
    ```
2. Crie um arquivo `.env` na raiz do projeto (opcional, por padrão usa a porta 3000).
3. Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```

## 📡 Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/transactions/view` | Lista todas as transações (suporta filtros via query string). |
| **GET** | `/transactions/find/:id` | Busca uma transação específica pelo ID. |
| **POST** | `/transactions/` | Cria uma nova transação. |
| **PUT** | `/transactions/:id` | Atualiza uma transação existente. |
| **DELETE** | `/transactions/:id` | Remove uma transação. |

## 📝 Exemplo de Transação

```json
{
  "type": "entrada",
  "category": "salary",
  "value": 5000,
  "desc": "Salário Mensal"
}
```

## 🏗️ Como o código foi pensado

A parte principal deste projeto é como as peças se encaixam. A lógica de negócio (`Service`) não sabe onde os dados são guardados de verdade. Ela apenas conversa com uma "porta de entrada" (`Repository`).

Isso significa que o sistema é flexível. Por padrão, ele salva tudo na memória (RAM), mas se você quiser usar **PostgreSQL** com **Prisma**, basta baixar o código da branch `feature/persistence`. O resto do sistema continua funcionando igualzinho, sem precisar de dor de cabeça para adaptar a lógica.

## 🚀 Tecnologias

-   **Node.js** com **TypeScript**
-   **Express**: Framework para as rotas HTTP.
-   **Prisma**: ORM para comunicação segura e tipada com o banco de dados.
-   **PostgreSQL**: Banco de dados relacional para persistência de dados.
-   **Zod**: Validação rigorosa de esquemas de dados.
-   **Dotenv**: Gerenciamento de variáveis de ambiente.
```