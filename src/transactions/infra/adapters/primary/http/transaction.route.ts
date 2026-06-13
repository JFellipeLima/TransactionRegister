import { Router } from "express"

import TransactionsController from "./transaction.controller.js"
import TransactionsService from "../../../../application/services/transaction.service.js"
import TransactionRepository from "../../secondary/transaction.repository.js"

const repo = new TransactionRepository()
const service =  new TransactionsService(repo)
const controller = new TransactionsController(service)

const router = Router()

router.get("/transactions/view", controller.view)

router.get("/transactions/:id", controller.findById)

router.post("/transactions/", controller.create)

router.put("/transactions/:id", controller.update)

router.delete("/transactions/:id", controller.delete)

export default router