import { env } from "./infra/config/env.js"
import dataRoutes from "./infra/adapters/primary/http/transaction.route.js"
import express from "express"

const app = express()

app.use(express.json())
app.use(dataRoutes)

app.listen(env.PORT || 3000, () => {
    console.log(`Server running on port ${env.PORT || 3000}`)
})