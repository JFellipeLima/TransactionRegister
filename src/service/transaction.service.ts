import type IRepo from "../repository/repository.interface.js"
import { transactionSchema as schema } from "../generated/schemas/index.js"
import type { Itransaction } from "../type/transaction.type.js"

/**
 * Serviço de Transações (Lógica de Domínio)
 * Responsável por aplicar as regras de negócio e validações.
 */
export default class TransactionsService {
    private repo: IRepo<Itransaction>

    constructor(repo: IRepo<Itransaction>) {
        this.repo = repo
    }

    /**
     * Valida o objeto de transação
     * @param data - Objeto para validação
     * @returns Objeto verificado
     */
    private validate = (data: Itransaction) => {
        const verify = schema.omit({ id: true }).parse(data)
        return verify
    }

    /**
     * Lista todas as transações
     * @returns Transações
     * Recupera todos os registros através do repositório.
     */
    view = async () => {
        return await this.repo.view()
    }

    /**
     * Busca uma transação por ID
     * @param id - ID da transação
     * @returns Transação ou nulo
     */
    findById = async (id: string) => {
        const item = await this.repo.findById(id)
        return item ?? null
    }

    /**
    * Cria uma nova transação
    * @param data - Dados para salvar
    * @returns Transação criada
    * Valida os dados de entrada contra o schema e solicita a criação no repositório.
    */
    create = async (data: Itransaction) => {
        const validateData = this.validate(data)
        if (!validateData) return null

        return await this.repo.create(validateData as Itransaction)
    }

    /**
     * Atualiza uma transação por ID
     * @param id - ID da transação
     * @param changeData - novos dados
     * @returns Transação alterada
    * Verifica a existência do item e aplica atualizações parciais de forma segura.
     */
    update = async (id: string, changeData: Partial<Itransaction>) => {
        const newData = schema.partial().parse(changeData)

        return await this.repo.update(id, newData as Itransaction) ?? null
    }

    /**
     * Remove uma transação por ID
     * @param id - ID da transação
     * Solicita ao repositório a remoção de um registro.
     */
    delete = async (id: string) => {
        return await this.repo.delete(id)
    }
}
