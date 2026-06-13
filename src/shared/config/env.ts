/**
 * Environment Configuration
 * Centraliza o acesso às variáveis de ambiente definidas no .env.
 */
import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: process.env.PORT, 
    DATABASE_URL: process.env.DATABASE_URL_APP,
}