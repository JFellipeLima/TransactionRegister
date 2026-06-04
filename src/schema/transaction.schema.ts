import { z } from "zod"

export const transactionSchema = z.object({
    id: z.string(),
    type: z.enum(["entrada", "saida"]),
    category: z.enum(["food", "transport", "education", "health", "other", "salary", "investment"]),
    value: z.coerce.number().positive(),
    date: z.coerce.date().default(() => new Date()),
    desc: z.string().min(5).max(30)
}).strict()

export const createTransactionSchema = transactionSchema.omit({ id: true })