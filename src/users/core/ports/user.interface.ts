export interface UserRepo<T>{
    getAll(): Promise<T[] | null>
    getById(id: string): Promise<T | null>
    create(user: T): Promise<T | null>
    update(id: string, user: Partial<T>): Promise<T | null>
    delete(id: string): Promise<boolean>

}