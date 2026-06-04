import { randomUUID } from "node:crypto"
import { transactionSchema, createTransactionSchema } from "../schema/transaction.schema.js"
import { querySchema } from "../schema/transaction.query.js"
import type { Iquery } from "../type/transaction.query.type.js"
import type { Itransaction } from "../type/transaction.type.js"
import type TransactionRepository from "../repository/transaction.repository.js"

/**
 * Handling transactions in memory
*/
export default class TransactionsService {
    private transactionSchema: typeof transactionSchema
    private createTransactionSchema: typeof createTransactionSchema
    private querySchema: typeof querySchema
    private repo: TransactionRepository
    
    constructor (transaction: typeof transactionSchema, query: typeof querySchema, memoryRepository: TransactionRepository) {
        this.transactionSchema = transaction
        this.createTransactionSchema = createTransactionSchema
        this.querySchema = query
        this.repo = memoryRepository
    }
        /**
     * Validate transaction object
     * @param transaction - Obejct for validate
     * @returns Verified object
     */
    private validate = (transaction: Itransaction) => {
        const verify = this.createTransactionSchema.parse(transaction)
        
        return verify
    }
    /**
     * Search for transactions
     * @param query - Query for filtred results
     * @returns Transactions
     */
    view = async (query: Iquery) => {
        const { start, end, category } = this.querySchema.parse(query)
        return await this.repo.view()
    }
    /*
     * Find a unique transaction by ID
     * @param ID - Transaction ID
     * @returns Transaction
     */
    findById = async (id: string) => {
        const item = await this.repo.findById(id)
        return item ? item : null
    }
    /**
    * Create transactions on database
    * @param transaction - The data object for save
    * @returns Created transaction
    */
    create = async (transaction: Itransaction) => {
        const validateData = this.validate(transaction)

        const id = randomUUID()
        const DTO = {
            id,
            ...validateData
        }

        await this.repo.create(id, DTO)

        return DTO
    }
    /**
     * Update a transaction by ID
     * @param ID - Transaction ID
     * @param data - new data for change
     * @returns Changed transaction
     */
    update = async (id: string, changeData: Partial<Itransaction>) => {
        const verify = this.transactionSchema.partial().parse(changeData)
        const exist = await this.repo.findById(id)

        if (!exist) return null

        if (verify) {
            const newData = {
                ...exist, 
                ...verify
            } as Itransaction

            return await this.repo.update(id, newData)
        }

        return null
    }
    /**
     * Delete a transaction by ID
     * @param ID - Transaction ID
     */
    delete = async (id: string) => {
        const deleted = await this.repo.delete(id)
        return deleted
    }
}