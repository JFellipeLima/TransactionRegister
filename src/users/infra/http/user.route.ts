import { Router } from "express"
import UserController from "./user.controller.js"
import UserRepository from "../prisma/user.repository.js"
import UserService from "../../application/services/user.service.js"
import { UserSchema, IdSchema } from "../../application/schemas/user.schema.js"
import validation from "../../../shared/middlewares/validation.js"

const repository = new UserRepository
const service = new UserService(repository)
const controller = new UserController(service)
const router = Router()

router.get("/user",
    controller.getAll
)
router.get("/user/:id", 
    validation({ params: IdSchema }),
    controller.getById
)
router.post("/user",
    validation({ body: UserSchema }),
    controller.create
)
router.put("/user/:id", 
    validation({ params: IdSchema, body: UserSchema.partial() }),
    controller.update
)
router.delete('/user/:id',
    validation({ params: IdSchema }),
    controller.delete
)

export default router