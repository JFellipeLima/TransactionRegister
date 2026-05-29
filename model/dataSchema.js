import { z } from "zod"

export default class dataMoel {
    querySchema = z.object({
        start: z.coerce.date().optional(),
        end: z.coerce.date().optional()
    })

    transactionSchema = z.object({
            type: z.enum(["entrada", "saida"]),
            value: z.coerce.number().positive(),
            date: z.coerce.date().default(() => new Date())
        }).strict()
}