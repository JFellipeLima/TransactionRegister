import { z } from "zod"

export const querySchema = z.object({
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional()
})

export const transactionSchema = z.object({
        type: z.enum(["entrada", "saida"]),
        value: z.coerce.number().positive(),
        date: z.coerce.date().default(() => new Date())
    }).strict()

export type Iquery = z.infer<typeof querySchema>
export type Itransaction = z.infer<typeof transactionSchema>