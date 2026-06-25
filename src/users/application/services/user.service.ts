import type RepositoryAdapter from "../../domain/user.repository.interface.js"
import type { IUser } from "../../domain/user.type.js"
import bcrypt from "bcrypt"

export default class UserService {
    private repo: RepositoryAdapter

    constructor(repo: RepositoryAdapter) {
        this.repo = repo
    }

    getAll = async () => {
        return await this.repo.view()
    }

    getById = async (id: string) => {
        return await this.repo.findById(id)
    }

    create = async (user: IUser) =>{
        const hashed = await bcrypt.hash(user.password, 10)
        user = {...user, password: hashed}
        return await this.repo.create(user)
    }

    update = async (id: string, user: Partial<IUser>) => {
        return await this.repo.update(id, user)
    }

    delete = async (id: string) => {
        return await this.repo.delete(id)
    }

}