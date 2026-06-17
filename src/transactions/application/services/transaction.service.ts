import type RepositoryAdapter from "../../../shared/ports/repository.interface.js";
import type { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from "../../core/domain/transaction.type.js";
import type { Iquery } from "../../core/domain/query.type.js";

export default class TransactionsService {
    private repo: RepositoryAdapter<Transaction, CreateTransactionDTO, UpdateTransactionDTO, Iquery>

    constructor(repo: RepositoryAdapter<Transaction, CreateTransactionDTO, UpdateTransactionDTO, Iquery>) {
        this.repo = repo
    }

    public view = async (query?: Iquery) => {
        return await this.repo.view(query)
    }

    public findById = async (id: string) => {
        return await this.repo.findById(id)
    }

    public create = async (data: CreateTransactionDTO) => {
        return await this.repo.create(data)
    }

    public update = async (id: string, changeData: UpdateTransactionDTO) => {
        return await this.repo.update(id, changeData)
    }

    public delete = async (id: string) => {
        return await this.repo.delete(id)
    }
}
