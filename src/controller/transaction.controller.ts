import type { Response, Request } from "express"
import type { Itransaction } from "../type/transaction.type.js"
import type TransactionsService from "../service/transaction.service.js"

/**
 * Converte requisições HTTP em chamadas para o domínio (Service).
 * Não contém regras de negócio, apenas orquestra a resposta HTTP.
 */
export default class TransactionsController {
    service: TransactionsService

    constructor (service: TransactionsService) {
        this.service = service
    }

    /**
     * Manipula a requisição para listar transações
     */
    public view = async (req: Request, res: Response): Promise<Response> => {
        const result: Itransaction[] = await this.service.view()
        return res.send(result)
    }

    /**
     * Manipula a requisição para buscar por ID
     */
    public findById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).send({ message: "ID inválido" })
        }

        const result = await this.service.findById(id)
        if (!result) {
            res.status(404).send({ message: "Transação não encontrada" })
        }

        return res.send(result)
    }

    /**
     * Manipula a requisição para criar uma nova transação
     * @param req - Requisição Express
     * @param res - Resposta Express
     * Endpoint para criar uma transação.
     */
    public create = async (req: Request, res: Response): Promise<Response> => {
        const transaction: Itransaction = req.body
        const data = await this.service.create(transaction)
        if (!data) {
            res.status(400).send({ message: "Falha na criação" })  
        }

        return res.status(201).send(data)
    }

    /**
     * Manipula a requisição para atualizar uma transação existente
     * @param req - Requisição Express
     * @param res - Resposta Express
     * Endpoint para editar dados de uma transação.
     */
    public update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).send({ message: "ID inválido" })
        }

        const changeData: Partial<Itransaction>= req.body
        const result = await this.service.update(id, changeData)
        if (!result) {
             res.status(400).send({ message: "Falha na atualização" })
        }

        return res.send(result)

    }

    /**
     * Manipula a requisição para remover uma transação
     * @param req - Requisição Express
     * @param res - Resposta Express
     * Endpoint para deletar uma transação.
     */
    public delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params
        if (typeof id !== "string" || !id) {
            return res.status(400).send({ message: "ID inválido" })
        }

        const deleted = await this.service.delete(id)
        if (!deleted) {
             res.status(404).send({ message: "Transação não encontrada" })
        }

        return res.status(204)

    }
}