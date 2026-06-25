export default interface RepositoryAdapter<Entity, CreateDTO = Entity, UpdateDTO = Partial<Entity>, Query = any> {
    view(query?: Query): Promise<Entity[]>,
    findById(id: string): Promise<Entity | null>,
    create(item: CreateDTO): Promise<Entity>,
    update(id: string, item: UpdateDTO): Promise<Entity | null>,
    delete(id: string): Promise<Entity>
}