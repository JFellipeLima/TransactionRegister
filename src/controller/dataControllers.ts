import type { Response, Request } from "express"
import type { Itransaction, Iquery } from "../model/dataSchema.js"
import type dataService from "../service/dataService.js"

/**
 * Controller of transactions
 */
export default class dataController {
    service: dataService
    
    constructor (service: dataService) {
        this.service = service
    }

    public view = async (req: Request, res: Response): Promise<Response> => {
        const query = req.query as Iquery
        const result: Itransaction[] = await this.service.view(query)

        return res.send(result)
    }

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

    public create = async (req: Request, res: Response): Promise<Response> => {
        const transaction = req.body as Itransaction
        await this.service.create(transaction)

        return res.status(201).send()
    }

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