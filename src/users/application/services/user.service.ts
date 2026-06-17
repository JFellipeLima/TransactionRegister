import type RepositoryAdapter from "../../../shared/ports/repository.interface.js"
import type { IUser } from "../../core/domain/user.type.js"
import { UserSchema } from "../schemas/user.schema.js"

export default class UserService {
    private repo: RepositoryAdapter<IUser>

    constructor(repo: RepositoryAdapter<IUser>) {
        this.repo = repo
    }

    async getAll() {
        return await this.repo.view()
    }

    async getById(id: string) {
        return await this.repo.findById(id)
    }

    async create(user: IUser) {
        const validated = UserSchema.parse(user)
        return await this.repo.create(validated)
    }

    async update(id: string, user: Partial<IUser>) {
        const validated = UserSchema.partial().parse(user)
        return await this.repo.update(id, validated)
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }

}