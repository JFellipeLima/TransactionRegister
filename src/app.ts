import { env } from "./shared/config/env.js"
import transactionRoutes from "./transactions/infra/adapters/primary/http/transaction.route.js"
import userRoutes from "./users/infra/adapters/primary/http/user.route.js"
import errorHandling from "./shared/middlewares/errorHandling.js"
import express from "express"

const app = express()

app.use(express.json())
app.use(transactionRoutes)
app.use(userRoutes)
app.use(errorHandling)

app.listen(env.PORT || 3000, () => {
    console.log(`Server running on port ${env.PORT || 3000}`)
})