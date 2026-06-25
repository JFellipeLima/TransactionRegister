import { env } from "./shared/config/env.js"
import transactionRoutes from "./transactions/infra/http/transaction.route.js"
import UserRoute from "./users/infra/http/user.route.js"
import errorHandling from "./shared/middlewares/errorHandling.js"
import express from "express"

const app = express()

app.use(express.json())
app.use(transactionRoutes)
app.use(UserRoute)
app.use(errorHandling)

app.listen(env.PORT || 3000, () => {
    console.log(`Server running on port ${env.PORT || 3000}`)
})