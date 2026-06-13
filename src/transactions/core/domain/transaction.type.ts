export type Itransaction = {
    id?: string
    type: "entrada" | "saida"
    category: "food" | "transport" | "education" | "health" | "other" | "salary" | "investment" 
    value: number
    desc: string
    date: Date,
}