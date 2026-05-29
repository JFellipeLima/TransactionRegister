import { randomUUID } from "node:crypto"

/**
 * Handling transactions in memory
*/
export default class dataService{
    constructor (schema) {
        this.transactionSchema = schema.transactionSchema
        this.querySchema = schema.querySchema
        this.updateSchema = schema.querySchema.partial()
    }
    #data = new Map()
        /**
     * Validate transaction object
     * @param transaction - Obejct for validate
     * @returns Verified object
     */
    validate = (transaction) => {
        const verify = this.transactionSchema.parse(transaction)
        
        return verify
    }
    /**
     * Search for transactions
     * @param query - Query for filtred results
     * @returns Transactions
     */
    view = (query) => {
        const { start, end } = this.querySchema.parse(query)

        if (start && end) {
            const use = [...this.#data.entries()]
            const filtered = use.filter(([k,v]) => {
                return v.date >= start && v.date <= end
            })
            return filtered

        }
        return Array.from(this.#data.entries())
    }
    /**
     * Find a unique transaction by ID
     * @param ID - Transaction ID
     * @returns Transaction
     */
    findById = (id) => {
        const item = this.#data.get(id)
        return item ? item : null
    }
    /**
    * Create transactions on database
    * @param transaction - The data object for save
    * @returns Created transaction
    */
    create = (transaction) => {
        const validateData = this.validate(transaction)
        console.log(validateData)

        const id = randomUUID()
        this.#data.set(id, {
            ...validateData
            })
        return {id, ...validateData}
    }
    /**
     * Update a transaction by ID
     * @param ID - Transaction ID
     * @param data - new data for change
     * @returns Changed transaction
     */
    update = (id, changeData) => {
        const verify = this.updateSchema.safeParse(changeData)
        const exist = this.#data.get(id)

        if (verify.success && exist) {
            const newData = {...exist, ...changeData}
            this.#data.set(id, newData)
            return newData
        }
    }
    /**
     * Delete a transaction by ID
     * @param ID - Transaction ID
     */
    delete = (id) => {
        const deleted = this.#data.delete(id)
        return deleted
    }
}