import { z } from "zod"
import { querySchema } from "../schema/transaction.query.js"

export type Iquery = z.infer<typeof querySchema>
