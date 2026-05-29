import { tr } from "zod/locales"
import dataService from "../service/dataService.js"

export default class dataController {
    constructor (service) {
        this.service = service
    }

    view = (req, res) => {
        const query = req.query
        const result = this.service.view(query)
        return res.send(result)
    }

    findById = (req, res) => {
        const { id } = req.params
        const result = this.service.findById(id)
        if (!result) {
            return res.status(404).send({ message: "Transaction not found" })
        }
        return res.send(result)
    }

    create = (req, res) => {
        const transaction = req.body
        console.log(transaction)
        const result = this.service.create(transaction)
        return res.status(201).send(result)
    }

    update = (req, res) => {
        const { id } = req.params
        const changeData = req.body
        const result = this.service.update(id, changeData)
        if (!result) {
            return res.status(400).send({ message: "Update failed" })
        }
        return res.send(result)
    }

    delete = (req, res) => {
        const { id } = req.params
        const deleted = this.service.delete(id)
        if (!deleted) {
            return res.status(404).send({ message: "Transaction not found" })
        }
        return res.status(204).send({ message: "Transaction deleted"})
    }
    
    
}