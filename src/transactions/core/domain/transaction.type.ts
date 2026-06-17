export type Transaction = {
    id: string
    type: "entrada" | "saida"
    category: "food" | "transport" | "education" | "health" | "other" | "salary" | "investment" 
    value: number
    desc: string
    date: Date
    userID: string
}

export type CreateTransactionDTO = Omit<Transaction, "id">;
export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;