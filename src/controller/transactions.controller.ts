import type { Response, Request } from "express"
import type { Itransaction } from "../type/transaction.type.js"
import type { Iquery } from "../type/transaction.query.type.js"
import type TransactionsService from "../service/transactions.service.js"

/**
 * Controller of transactions
 * Responsável por receber as chamadas HTTP e enviar a resposta para o usuário.
 * Ele não decide as regras de negócio, apenas repassa para o Service.
 */
export default class TransactionsController {
    service: TransactionsService
    
    constructor (service: TransactionsService) {
        this.service = service
    }

    /**
     * Handle request to list all transactions
     * @param req - Express Request
     * @param res - Express Response
     * Endpoint para listar transações.
     */
    public view = async (req: Request, res: Response): Promise<Response> => {
        const query = req.query as Iquery
        const result: Itransaction[] = await this.service.view(query)

        return res.send(result)
    }

    /**
     * Handle request to find a transaction by ID parameter
     * @param req - Express Request
     * @param res - Express Response
     * Endpoint para buscar uma única transação pelo ID.
     */
    public findById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).send({ message: "Invalid ID" })
        }

        const result = await this.service.findById(id)

        if (!result) {
            return res.status(404).send({ message: "Transaction not found" })
        }

        return res.send(result)
    }

    /**
     * Handle request to create a new transaction
     * @param req - Express Request
     * @param res - Express Response
     * Endpoint para criar uma transação.
     */
    public create = async (req: Request, res: Response): Promise<Response> => {
        const transaction = req.body as Itransaction
        const data = await this.service.create(transaction)

        return res.status(201).send(data)
    }

    /**
     * Handle request to update an existing transaction
     * @param req - Express Request
     * @param res - Express Response
     * Endpoint para editar dados de uma transação.
     */
    public update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).send({ message: "Invalid ID" })
        }

        const changeData = req.body as Partial<Itransaction>
        const result = await this.service.update(id, changeData)
        
        if (!result) {
            return res.status(400).send({ message: "Update failed" })
        }

        return res.send(result)
    }

    /**
     * Handle request to remove a transaction
     * @param req - Express Request
     * @param res - Express Response
     * Endpoint para deletar uma transação.
     */
    public delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).send({ message: "Invalid ID" })
        }

        const deleted = await this.service.delete(id)

        if (!deleted) {
            return res.status(404).send({ message: "Transaction not found" })
        }

        return res.status(204).send()
    }
}