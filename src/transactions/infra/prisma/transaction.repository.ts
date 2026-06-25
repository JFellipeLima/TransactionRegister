import type RepositoryAdapter from "../../domain/transaction.repository.interface.js";
import type { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from "../../domain/transaction.type.js";
import type { Iquery } from "../../domain/transaction.type.js";
import transactionsFilter from "../prisma/transaction.filter.js"
import prisma from "../../../shared/database/prisma.js";
import Prisma from "../../../shared/generated/client/index.js";
import * as errors from "../../../shared/helper/errors.js";

export default class TransactionsRepository implements RepositoryAdapter<Transaction, CreateTransactionDTO, UpdateTransactionDTO, Iquery> {

    private mapToEntity = (i: Prisma.Transaction): Transaction => ({
        id: i.id,
        type: i.type,
        category: i.category,
        value: i.value,
        desc: i.desc,
        date: i.date,
        userID: i.userID
    })

    public view = async (query?: Iquery): Promise<Transaction[]> => {
        const buildQuery = transactionsFilter.build(query)
        const results = await prisma.transaction.findMany({ where: buildQuery })
        return results.map(this.mapToEntity)
    }

    public findById = async (id: string): Promise<Transaction | null> => {
        const result = await prisma.transaction.findUnique({ where: { id } })
        return result ? this.mapToEntity(result) : null
    }

    public create = async (item: CreateTransactionDTO): Promise<Transaction> => {
        try {
            const result = await prisma.transaction.create({ data: item })
            return this.mapToEntity(result)
        } catch (error) {
            if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new errors.InvalidDataError(`Transaction with provided data already exists.`);
                }
                if (error.code === 'P2003') {
                    throw new errors.NotFoundError(`User ID provided does not exist.`);
                }
            }
            throw error;
        }
    }

    public update = async (id: string, item: UpdateTransactionDTO): Promise<Transaction | null> => {
        try {
            const result = await prisma.transaction.update({
                where: { id },
                data: item
            })
            return this.mapToEntity(result)
        } catch (error) {
            if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new errors.NotFoundError(`Transaction not found.`)
                }
                if (error.code === 'P2002') {
                    throw new errors.InvalidDataError(`Update would violate a unique constraint.`)
                }
            }
            throw error
        }
    }
    
    public delete = async (id: string): Promise<Transaction> => {
        try {
            const deleted = await prisma.transaction.delete({ where: { id } })
            return this.mapToEntity(deleted)
        } catch (error) {
            if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new errors.NotFoundError(`Transaction not found.`)
                }
            }
            throw error
        }
    }
}