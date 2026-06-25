import type { Request, Response } from "express"
import UserService from "../../application/services/user.service.js"
import type { IUser } from "../../domain/user.type.js"

export default class UserController {
    private service: UserService

    constructor(service: UserService) {
        this.service = service
    }
    public getAll = async (req: Request, res: Response) => {
        const users = await this.service.getAll()
        return res.status(200).json(users)
    }

    public getById = async (req: Request, res: Response) => {
        const user = await this.service.getById(req.params.id as string)
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrando" })
        }
        return res.status(200).json(user)
    }

    public create = async (req: Request, res: Response) => {
        const user: IUser = req.body
        const resp = await this.service.create(user)
        return res.status(201).json(resp)
    }

    public update = async (req: Request, res: Response) => {
        const resp = await this.service.update(req.params.id as string, req.body)
        return res.status(200).json(resp)
    }

    public delete = async (req: Request, res: Response) =>  {
        const resp = await this.service.delete(req.params.id as string)
        return res.status(204).send(resp)
    }
}
