import type { Request, Response } from "express"
import UserService from "../../../../application/services/user.service.js"
import type { IUser } from "../../../../core/domain/user.type.js"

export default class UserController {
    private service: UserService

    constructor(service: UserService) {
        this.service = service
    }
    async getAll(req: Request, res: Response) {
        const users = await this.service.getAll()
        return res.status(200).json(users)
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).json({ message: "ID inválido" })
        }

        const user = await this.service.getById(id)
        return res.status(200).json(user)
    }

    async create(req: Request, res: Response) {
        const user: IUser = req.body
        const resp = await this.service.create(user)

        return res.status(201).json(resp)
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).json({ message: "ID inválido" })
        }

        const user: Partial<IUser> = req.body
        const resp = await this.service.update(id, user)

        return res.status(200).json(resp)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).json({ message: "ID inválido" })
        }

        const resp = await this.service.delete(id)
        return res.status(204).send(resp)
    }
}
