import type { IUser, IUserPub } from "./user.type.js"

export default interface RepositoryAdapter {
    view(): Promise<IUserPub[]>,
    findById(id: string): Promise<IUserPub | null>,
    create(item: IUser): Promise<IUserPub>,
    update(id: string, item: Partial<IUser>): Promise<IUserPub | null>,
    delete(id: string): Promise<IUserPub>
}