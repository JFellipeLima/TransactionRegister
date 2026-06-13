export default interface RepositoryAdapter<I, Q = any> {
    view(query?: Q): Promise<I[]>,
    findById(id: string): Promise<I | null>,
    create(item: I): Promise<I>,
    update(id: string, item: Partial<I>): Promise<I | null>,
    delete(id: string): Promise<boolean>
}