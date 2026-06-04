import type { Itransaction } from "../type/transaction.type.js"
import type TransactionRepository from "../repository/transaction.repository.js"


/**
 * In-memory implementation of TransactionRepository
 * Implementação que salva as transações temporariamente na memória (RAM).
*/
export default class TransactionMemory implements TransactionRepository {    
    private data = new Map<string, Itransaction>()

    /**
     * Retrieve all transactions from memory
     * @returns List of all stored transactions
     * Retorna a lista de tudo o que está salvo.
     */
    public view = async () => {
        return Array.from(this.data.values())
    }

    /**
     * Retrieve a transaction by ID
     * @param id - Identifier
     * @returns Transaction data
     * Busca um item específico.
     */
    public findById = async (id: string) => {
        const item = this.data.get(id)
        return item
    }

    /**
     * Set a new transaction in the Map
     * @param id - Identifier
     * @param transaction - Data
     * @returns Created transaction
     * Adiciona uma nova transação no mapa de memória.
     */
    public create = async (id: string, transaction: Itransaction) => {
        this.data.set(id, transaction)
        return transaction
    }

    /**
     * Update data in the Map
     * @param id - Identifier
     * @param transaction - New data
     * @returns Updated transaction
     * Altera os dados de uma transação já existente.
     */
    public update = async (id: string, transaction: Itransaction) => {
        this.data.set(id, transaction)
        return transaction
    }

    /**
     * Remove item from the Map
     * @param id - Identifier
     * @returns Success status
     * Remove um item da memória pelo ID.
     */
    public delete = async (id: string) => {
        const deleted = this.data.delete(id)
        return deleted
    }

}