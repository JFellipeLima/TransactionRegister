/**
 * Interface para persistência de transações (Porto de Saída)
 * Define como a aplicação espera que os dados sejam salvos, sem depender de banco de dados específico.
 */
export default interface IRepo<I> {
    /**
     * Recupera todos os registros
     * @returns Array de itens
     */
    view(): Promise<I[]>,

    /**
     * Busca um registro pelo identificador único
     * @param id - ID do registro
     * @returns Objeto encontrado ou nulo
     */
    findById(id: string): Promise<I | null>,

    /**
     * Salva um novo registro
     * @param item - Dados para salvar
     * @returns O registro salvo
     */
    create(item: I): Promise<I>,

    /**
     * Atualiza um registro existente
     * @param id - ID do registro
     * @param item - Novos dados
     * @returns Registro atualizado ou nulo
     */
    update(id: string, item: I): Promise<I | null>,

    /**
     * Remove um registro do armazenamento
     * @param id - ID do registro
     * @returns Verdadeiro se deletado, falso caso contrário
     */
    delete(id: string): Promise<boolean>
}