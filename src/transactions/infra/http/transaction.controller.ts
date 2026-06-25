import type { Response, Request } from "express"
import * as errors from "../../../shared/helper/errors.js"
import TransactionsService from "../../application/services/transaction.service.js"

export default class TransactionsController {
    service: TransactionsService

    constructor (service: TransactionsService) {
        this.service = service
    }

    public view = async (req: Request, res: Response) => {
        const query = res.locals.query
        const result = await this.service.view(query)
        return res.status(200).json(result)
    }

    public findById = async (req: Request, res: Response) => {
        const result = await this.service.findById(req.params.id as string)
        if (!result) {
            throw new errors.NotFoundError("Transação não encontrada")
        }

        return res.status(200).json(result)
    }

    public create = async (req: Request, res: Response) => {
        const data = await this.service.create(req.body)
        return res.status(201).json(data)
    }

    public update = async (req: Request, res: Response) => {
        const result = await this.service.update(req.params.id as string, req.body)
        return res.status(200).json(result)
    }

    public delete = async (req: Request, res: Response) => {
        await this.service.delete(req.params.id as string)
        return res.status(204).send()
    }
}