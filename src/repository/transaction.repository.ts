import type IRepo from "./repository.interface.js";
import type { Itransaction } from "../type/transaction.type.js";
import prisma from "../database/prisma.js";

/**
 * Adaptador de Persistência para Transações usando Prisma
 * Implementa o contrato definido pela IRepo (Porto de Saída).
 */
export default class TransactionsRepository implements IRepo<Itransaction> {
    /**
     * Busca todos os registros no banco de dados
     */
    public view = async () => {
        const results = await prisma.transaction.findMany()
        return results as Itransaction[]
    }

    /**
     * Busca um registro por ID único
     */
    public findById = async (id: string) => {
        const result = await prisma.transaction.findUnique({ where: { id } })
        return result ?? null
    }

    /**
     * Insere um novo registro
     */
    public create = async (data: Itransaction) => {
        const result = await prisma.transaction.create({ data })
        return result as Itransaction
    }

    /**
     * Atualiza os dados de um registro
     */
    public update = async (id: string, data: Itransaction) => {
        try {
            const result = await prisma.transaction.update({
                where: { id },
                data
            })
            return result as Itransaction
        } catch {
            return null
        }
    }

    /**
     * Remove um registro do banco de dados
     */
    public delete = async (id: string) => {
        try {
            await prisma.transaction.delete({ where: { id } })
            return true
        } catch {
            return false
        }
    }
}