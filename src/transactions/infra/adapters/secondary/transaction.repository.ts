import type RepositoryAdapter from "../../../core/ports/repository.interface.js";
import type { Itransaction } from "../../../core/domain/transaction.type.js";
import transactionsFilter from "../secondary/transaction.filter.js"
import prisma from "../../../../shared/database/prisma.js";
import type { Iquery } from "../../../core/domain/query.type.js";
import type { Transaction } from "../../../../shared/generated/client/index.js";

export default class TransactionsRepository implements RepositoryAdapter<Itransaction> {

    private mapToEntity = (i: Transaction): Itransaction => ({
        id: i.id,
        type: i.type,
        category: i.category,
        value: i.value,
        desc: i.desc,
        date: i.date
    })

    public view = async (query?: Iquery) => {
        const buildQuery = transactionsFilter.build(query)
        const results = await prisma.transaction.findMany({ where: buildQuery })
        return results.map(this.mapToEntity)
    }

    public findById = async (id: string) => {
        const result = await prisma.transaction.findUnique({ where: { id } })
        return result ? this.mapToEntity(result) : null
    }

    public create = async (item: Itransaction) => {
        const result = await prisma.transaction.create({ data: item as any })
        return this.mapToEntity(result)
    }

    public update = async (id: string, item: Partial<Itransaction>) => {
        try {
            const result = await prisma.transaction.update({
                where: { id },
                data: item as any
            })
            return this.mapToEntity(result)
        } catch {
            return null
        }
    }

    public delete = async (id: string) => {
        try {
            await prisma.transaction.delete({ where: { id } })
            return true
        } catch {
            return false
        }
    }
}