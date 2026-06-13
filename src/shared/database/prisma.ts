/**
 * Database Client
 * Configuração do Prisma Client com suporte ao adaptador do PostgreSQL.
 */
import { env } from "../config/env.js"
import { PrismaClient } from "../generated/client/client.js";
import { PrismaPg } from "@prisma/adapter-pg"

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is required")

const prisma = new PrismaClient({
  adapter: new PrismaPg(env.DATABASE_URL),

});

export default prisma;