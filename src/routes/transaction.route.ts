/**
 * Rotas para os métodos de transações
 * Centraliza a definição das rotas de transações e a injeção de dependências.
 */
import { Router } from "express"

import TransactionsController from "../controller/transaction.controller.js"
import TransactionsService from "../service/transaction.service.js"
import transactionRepository from "../repository/transaction.repository.js"

const repo = new transactionRepository()
const service =  new TransactionsService(repo)
const controller = new TransactionsController(service)

const router = Router()

router.get("/transactions/view", controller.view)

router.get("/transactions/find/:id", controller.findById)

router.post("/transactions/", controller.create)

router.put("/transactions/:id", controller.update)

router.delete("/transactions/:id", controller.delete)

export default router