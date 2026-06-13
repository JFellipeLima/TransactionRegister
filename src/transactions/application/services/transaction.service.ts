import type RepositoryAdapter from "../../core/ports/repository.interface.js";
import type { Itransaction } from "../../core/domain/transaction.type.js";
import type { Iquery } from "../../core/domain/query.type.js";
import { QuerySchema } from "../schema/transaction.querySchema.js";
import { TransactionSchema } from "../schema/transaction.schema.js";

export default class TransactionsService {
    private repo: RepositoryAdapter<Itransaction>

    constructor(repo: RepositoryAdapter<Itransaction>) {
        this.repo = repo
    }

    private validate = (data: Itransaction) => {
        return TransactionSchema.omit({ id: true }).parse(data)
    }

    view = async (query?: Iquery) => {
        const validated = QuerySchema.parse(query)
        return await this.repo.view(validated)
    }

    findById = async (id: string) => {
        return await this.repo.findById(id)
    }

    create = async (data: Itransaction) => {
        const validated = this.validate(data)
        return await this.repo.create(validated)
    }

    update = async (id: string, changeData: Partial<Itransaction>) => {
        const validated = TransactionSchema.partial().parse(changeData)
        return await this.repo.update(id, validated)
    }

    delete = async (id: string) => {
        return await this.repo.delete(id)
    }
}
