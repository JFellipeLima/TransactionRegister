import { z } from "zod"
import { $Enums as enums } from "../../../shared/generated/client/index.js" 

export const QuerySchema = z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
    type: z.enum(enums.Type),
    category: z.enum(enums.Category), 
}).partial().strict()