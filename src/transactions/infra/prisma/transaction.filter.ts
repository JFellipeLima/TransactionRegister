import type { Iquery } from "../../domain/transaction.type.js";
import { Prisma } from "../../../shared/generated/client/index.js";

type TransactionWhere = Prisma.TransactionWhereInput

export default class TransactionsFilter {
    public static build(query?: Iquery): TransactionWhere { 
        const where: TransactionWhere = {}

        if (query) {
            if (query.category) where.category = query.category
            if (query.type) where.type = query.type
            if (query.start || query.end) {
                where.date = {
                    ...query.start && { gte: query.start },
                    ...query.end && { lte: query.end }
                }
            }
        }
        return where
    }
}