/**
 * Routes for transactions methods
 */
import { Router } from "express"

import TransactionsController from "../controller/transactions.controller.js"
import TransactionsService from "../service/transactions.service.js"
import TransactionMemory from "../repository/transaction.memory.js"
import { transactionSchema } from "../schema/transaction.schema.js"
import { querySchema } from "../schema/transaction.query.js"

const memory = new TransactionMemory()
const service =  new TransactionsService(transactionSchema, querySchema, memory)
const controller = new TransactionsController(service)

const router = Router()

router.get("/transactions/view", controller.view)

router.get("/transactions/find/:id", controller.findById)

router.post("/transactions/", controller.create)

router.put("/transactions/:id", controller.update)

router.delete("/transactions/:id", controller.delete)

export default router