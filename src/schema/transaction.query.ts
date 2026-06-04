import { z } from "zod"

export const querySchema = z.object({
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    category: z.string().optional()
})
