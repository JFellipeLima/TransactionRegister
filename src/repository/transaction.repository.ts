import type { Itransaction} from "../type/transaction.type.js" 
import type { Iquery } from "../type/transaction.query.type.js"

/**
 * Interface for transaction persistence
 * Contrato que define como o sistema deve lidar com os dados.
 * Isso permite que a lógica principal não fique presa a um banco específico.
 */
export default interface TransactionRepository {
    /**
     * Get all transactions
     * @returns Array of transactions
     * Pega todas as transações
     */
    view(): Promise<Itransaction[]>,

    /**
     * Find a transaction by its unique identifier
     * @param id - Transaction ID
     * @returns Transaction object or undefined
     * Procura uma transação pelo ID
     */
    findById(id: string): Promise<Itransaction | undefined>,

    /**
     * Save a new transaction
     * @param id - Unique identifier
     * @param transaction - Data to be saved
     * @returns The saved transaction
     * Salva uma nova transação
     */
    create(id: string, transaction: Itransaction): Promise<Itransaction>,

    /**
     * Update an existing transaction
     * @param id - Transaction ID
     * @param transaction - New data
     * @returns Updated transaction or null
     * Atualiza uma transação que já existe
     */
    update(id: string, transaction: Itransaction): Promise<Itransaction | null>,

    /**
     * Remove a transaction from storage
     * @param id - Transaction ID
     * @returns True if deleted, false otherwise
     * Apaga uma transação
     */
    delete(id: string): Promise<boolean>
}