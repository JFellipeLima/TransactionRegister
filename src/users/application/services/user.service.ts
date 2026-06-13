import type { UserRepo } from "../../core/ports/user.interface.js"
import type { IUser } from "../../core/domain/user.type.js"
import { UserSchema } from "../schemas/user.schema.js"

export default class UserService {
    private repo: UserRepo<IUser>

    constructor(repo: UserRepo<IUser>) {
        this.repo = repo
    }

    async getAll() {
        return await this.repo.getAll()
    }

    async getById(id: string) {
        return await this.repo.getById(id)
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