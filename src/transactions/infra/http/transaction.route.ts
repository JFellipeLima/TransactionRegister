import { Router } from "express"
import TransactionsController from "./transaction.controller.js"
import TransactionsService from "../../application/services/transaction.service.js"
import TransactionRepository from "../prisma/transaction.repository.js"
import validation from "../../../shared/middlewares/validation.js"
import { TransactionBodySchema,idParamsSchema } from "../../application/schema/transaction.schema.js"
import { QuerySchema } from "../../application/schema/transaction.schema.js"

const repo = new TransactionRepository()
const service =  new TransactionsService(repo)
const controller = new TransactionsController(service)

const router = Router()

router.get("/transactions/view", 
    validation({ query: QuerySchema }), 
    controller.view
)

router.get("/transactions/:id", 
    validation({ params: idParamsSchema }), 
    controller.findById
)

router.post("/transactions/",
    validation({ body: TransactionBodySchema }),
    controller.create
)

router.put("/transactions/:id", 
    validation({ params: idParamsSchema, body: TransactionBodySchema.partial() }), 
    controller.update
)

router.delete("/transactions/:id", 
    validation({ params: idParamsSchema }), 
    controller.delete
)

export default router