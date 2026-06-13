import { Router } from "express";
import UserController from "../../primary/http/user.controller.js";
import UserService from "../../../../application/services/user.service.js";
import UserRepository from "../../../../infra/adapters/secondary/user.repository.js";

const repo = new UserRepository()
const service = new UserService(repo)
const controller = new UserController(service)

const router = Router()

router.get("/user", (req, res) => controller.getAll(req, res))
router.get("/user/:id", (req, res) => controller.getById(req, res))
router.post("/user", (req, res) => controller.create(req, res))
router.put("/user/:id", (req, res) => controller.update(req, res))
router.delete("/user/:id", (req, res) => controller.delete(req, res))

export default router