import { randomUUID } from "node:crypto"
import { transactionSchema, querySchema, type Itransaction, type Iquery } from "../model/dataSchema.js"

/**
 * Handling transactions in memory
*/
export default class dataService{
    private transactionSchema: typeof transactionSchema
    private querySchema: typeof querySchema
    
    constructor (transaction: typeof transactionSchema, query: typeof querySchema) {
        this.transactionSchema = transaction
        this.querySchema = query
    }
    private data = new Map<string, Itransaction & {id: string}>()
        /**
     * Validate transaction object
     * @param transaction - Obejct for validate
     * @returns Verified object
     */
    private validate = (transaction: Itransaction) => {
        const verify = this.transactionSchema.parse(transaction)
        
        return verify
    }
    /**
     * Search for transactions
     * @param query - Query for filtred results
     * @returns Transactions
     */
    view = (query: Iquery) => {
        const { start, end } = this.querySchema.parse(query)
        const allTransactions = Array.from(this.data.values())

        if (start && end) {
            const filtered = allTransactions.filter(transaction => {
                return transaction.date >= start && transaction.date <= end
            })
            return filtered

        }
        return allTransactions
    }
    /**
     * Find a unique transaction by ID
     * @param ID - Transaction ID
     * @returns Transaction
     */
    findById = (id: string) => {
        const item = this.data.get(id)
        return item ? item : null
    }
    /**
    * Create transactions on database
    * @param transaction - The data object for save
    * @returns Created transaction
    */
    create = (transaction: Itransaction) => {
        const validateData = this.validate(transaction)
        console.log(validateData)

        const id = randomUUID()
        this.data.set(id, {
            ...validateData,
            id
            })
        return {id, ...validateData}
    }
    /**
     * Update a transaction by ID
     * @param ID - Transaction ID
     * @param data - new data for change
     * @returns Changed transaction
     */
    update = (id: string, changeData: Partial<Itransaction>) => {
        const verify = this.transactionSchema.partial().parse(changeData)
        const exist = this.data.get(id)
        if (!exist) return null

        if (verify) {
            const newData = {
                ...exist, 
                ...verify
            } as Itransaction & {id: string}
            this.data.set(id, newData)

            return newData
        }
        return null
    }
    /**
     * Delete a transaction by ID
     * @param ID - Transaction ID
     */
    delete = (id: string) => {
        const deleted = this.data.delete(id)
        return deleted
    }
}