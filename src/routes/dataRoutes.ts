/**
 * Routes for transactions methods
 */
import dataController from "../controller/dataControllers.js"
import { transactionSchema, querySchema } from "../model/dataSchema.js"
import dataService from "../service/dataService.js"
import { Router } from "express"

const service =  new dataService(transactionSchema, querySchema)
const controller = new dataController(service)

const router = Router()

router.get("/transactions/view", controller.view)

router.get("/transactions/find/:id", controller.findById)

router.post("/transactions/", controller.create)

router.put("/transactions/:id", controller.update)

router.delete("/transactions/:id", controller.delete)

export default router