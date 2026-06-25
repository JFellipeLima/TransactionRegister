import { z } from "zod"
import { $Enums as enums } from "../../../shared/generated/client/index.js"

export const TransactionBodySchema = z.object({
    id: z.string().optional(),
    type: z.enum(enums.Type),
    category: z.enum(enums.Category),
    value: z.number().positive("O valor deve ser maior que zero"),
    desc: z.string().min(1, "A descrição é obrigatória"),
    date: z.coerce.date(),
    userID: z.string()

}).strict()

export const QuerySchema = z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
    type: z.enum(enums.Type),
    category: z.enum(enums.Category), 
}).partial().strict()

export const idParamsSchema = z.object({ id: z.string("ID inválido") });