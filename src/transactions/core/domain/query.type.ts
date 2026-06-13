export type Iquery = {
    start?: Date
    end?: Date
    type?: "entrada" | "saida"
    category?: "food" | "transport" | "education" | "health" | "other" | "salary" | "investment"
}