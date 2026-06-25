import { z } from "zod"

export const UserSchema = z.object({
    name: z.string().max(100),
    password: z.string().min(8).max(100),
})

export const IdSchema = z.object({ id: z.string() })