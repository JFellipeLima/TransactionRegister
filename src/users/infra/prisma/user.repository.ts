import type RepositoryAdapter from "../../domain/user.repository.interface.js"
import prisma from "../../../shared/database/prisma.js"
import Prisma from "../../../shared/generated/client/index.js"
import * as errors from "../../../shared/helper/errors.js"
import type { IUser, IUserPub} from "../../domain/user.type.js"
import type { User } from "../../../shared/generated/client/index.js"
import bcrypt from "bcrypt"

export default class UserRepository implements RepositoryAdapter{
    private user = prisma.user
    private mapToEntity = (i: User): IUserPub => ({
        id: i.id,
        name: i.name,
    })

    public view = async () => {
        const results = await this.user.findMany()
        return results.map(this.mapToEntity)
    }

    public findById = async (id: string) => {
        const result = await this.user.findUnique({ where: { id } })
        return result ? this.mapToEntity(result) : null
    }

    public create = async (item: IUser) => {
        try {
            const result = await this.user.create({ data: item })
            return this.mapToEntity(result)
        } catch (error) {
            if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new errors.InvalidDataError("This user arlead existis")
                }
            }
            throw error
        }
    }

    public update = async (id: string, item: Partial<IUser>) => {
        try {
            const result = await this.user.update({
                where: { id },
                data: item
            })
            return this.mapToEntity(result)
        } catch (error) {
            if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new errors.NotFoundError("User not found.");
                }
                if (error.code === 'P2002') {
                    throw new errors.InvalidDataError("Update would violate a unique constraint.");
                }
            }
            throw error
        }
    }

    public delete = async (id: string) => {
        try {
            const deleted = await this.user.delete({ where: { id } })
            return this.mapToEntity(deleted)
        } catch (error) {
            if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new errors.NotFoundError("User not found.")
                }
            }
            throw error;
        }
    }
}