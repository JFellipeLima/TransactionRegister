import { z } from "zod"
import { $Enums as enums } from "../../infra/generated/client/index.js"

export const TransactionSchema = z.object({
    id: z.string().optional(),
    type: z.enum(enums.Type),
    category: z.enum(enums.Category),
    value: z.number().positive("O valor deve ser maior que zero"),
    desc: z.string().min(1, "A descrição é obrigatória"),
    date: z.coerce.date()
}).strict()