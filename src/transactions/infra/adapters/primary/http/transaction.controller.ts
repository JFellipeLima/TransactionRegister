import type { Response, Request } from "express"
import type { Itransaction } from "../../../../core/domain/transaction.type.js"
import TransactionsService from "../../../../application/services/transaction.service.js"

export default class TransactionsController {
    service: TransactionsService

    constructor (service: TransactionsService) {
        this.service = service
    }

    public view = async (req: Request, res: Response): Promise<Response> => {
        const query = req.query
        const result: Itransaction[] = await this.service.view(query)
        return res.status(200).json(result)
    }

    public findById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).json({ message: "ID inválido" })
        }

        const result = await this.service.findById(id)
        if (!result) {
            res.status(404).json({ message: "Transação não encontrada" })
        }

        return res.status(200).json(result)
    }

    public create = async (req: Request, res: Response): Promise<Response> => {
        const transaction: Itransaction = req.body
        const data = await this.service.create(transaction)
        if (!data) {
            res.status(400).json({ message: "Falha na criação" })
        }

        return res.status(201).json(data)
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).json({ message: "ID inválido" })
        }

        const changeData: Partial<Itransaction> = req.body
        const result = await this.service.update(id, changeData)
        if (!result) {
             res.status(400).json({ message: "Falha na atualização" })
        }

        return res.status(201).json(result)
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).json({ message: "ID inválido" })
        }

        const deleted = await this.service.delete(id)
        if (!deleted) {
             res.status(404).json({ message: "Transação não encontrada" })
        }

        return res.status(204).send()

    }
}