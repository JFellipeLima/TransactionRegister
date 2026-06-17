import type { Response, Request } from "express"
import { z } from "zod"
import * as errors from "../../../../../shared/helper/errors.js"
import TransactionsService from "../../../../application/services/transaction.service.js"
import { TransactionSchema } from "../../../../application/schema/transaction.schema.js"

export default class TransactionsController {
    service: TransactionsService

    constructor (service: TransactionsService) {
        this.service = service
    }

    public view = async (req: Request, res: Response) => {
        const query = req.query
        const result = await this.service.view(query)
        return res.status(200).json(result)
    }

    public findById = async (req: Request, res: Response) => {
        const id = z.string().parse(req.params.id)

        const result = await this.service.findById(id)
        if (!result) {
            throw new errors.NotFoundError("Transação não encontrada")
        }

        return res.status(200).json(result)
    }

    public create = async (req: Request, res: Response) => {
        const transactionData = TransactionSchema.omit({ id: true }).parse(req.body)
        const data = await this.service.create(transactionData)

        return res.status(201).json(data)
    }

    public update = async (req: Request, res: Response) => {
        const id = z.string().parse(req.params.id)
        const changeData = TransactionSchema.partial().omit({ id: true, userID: true }).parse(req.body)
        const result = await this.service.update(id, changeData)
        return res.status(200).json(result)
    }

    public delete = async (req: Request, res: Response) => {
        const id = z.string().parse(req.params.id)
        await this.service.delete(id)
        return res.status(204).send()
    }
}