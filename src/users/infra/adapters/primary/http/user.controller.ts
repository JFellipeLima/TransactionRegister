import type { Request, Response } from "express"
import UserService from "../../../../application/services/user.service.js"
import type { IUser } from "../../../../core/domain/user.type.js"
import * as errors from "../../../../../shared/helper/errors.js"

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
            throw new errors.InvalidDataError("ID inválido")
        }
        const user = await this.service.getById(id)
        if (!user) {
            throw new errors.NotFoundError("Usuário não encontrado")
        }

        return res.status(200).json(user)
    }

    async create(req: Request, res: Response) {
        const user: IUser = req.body
        if (!user) {
            throw new errors.InvalidDataError("Dados inválidos")
        }
        const resp = await this.service.create(user)

        return res.status(201).json(resp)
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const user: Partial<IUser> = req.body
        if (typeof id !== "string" || !id) {
            throw new errors.InvalidDataError("ID invalido")
        }
        const resp = await this.service.update(id, user)

        return res.status(200).json(resp)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            throw new errors.InvalidDataError("ID invalido")
        }
        const resp = await this.service.delete(id)

        return res.status(204).send(resp)
    }
}
