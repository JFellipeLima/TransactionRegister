import type { Iquery } from "../../../core/domain/query.type.js";
import { Prisma } from "../../generated/client/index.js";

type TransactionWhere = Prisma.transactionWhereInput

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