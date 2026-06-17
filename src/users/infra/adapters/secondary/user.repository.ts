import prisma from "../../../../shared/database/prisma.js"
import type { IUser } from "../../../core/domain/user.type.js"
import type RepositoryAdapter from "../../../../shared/ports/repository.interface.js"
import type { User } from "../../../../shared/generated/client/index.js"

export default class UserRepository implements RepositoryAdapter<IUser>{

    private mapToEntity = (i: User): IUser => ({
        id: i.id,
        name: i.name,
        password: i.password
    })

    public view = async () => {
        const results = await prisma.user.findMany()
        return results.map(this.mapToEntity)
    }

    public findById = async (id: string) => {
        const result = await prisma.user.findUnique({ where: { id } })
        return result ? this.mapToEntity(result) : null
    }

    public create = async (item: IUser) => {
        const result = await prisma.user.create({ data: item })
        return this.mapToEntity(result)
    }

    public update = async (id: string, item: Partial<IUser>) => {
        try {
            const result = await prisma.user.update({
                where: { id },
                data: item
            })
            return this.mapToEntity(result)
        } catch {
            return null
        }
    }

    public delete = async (id: string) => {
        return await prisma.user.delete({ where: { id } })
        
    }
}