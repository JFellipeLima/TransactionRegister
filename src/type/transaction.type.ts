/**
 * Transaction Types
 * Definições de tipos TypeScript derivadas do schema Zod para garantir consistência entre validação e tipagem.
 */
import { z } from "zod"
import { transactionSchema } from "../generated/schemas/index.js"

export type Itransaction = z.infer<typeof transactionSchema>