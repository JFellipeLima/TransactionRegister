import { z } from "zod"
import { transactionSchema } from "../schema/transaction.schema.js"

export type Itransaction = z.infer<typeof transactionSchema>