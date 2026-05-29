import dotenv from "dotenv";dotenv.config()
import dataRoutes from "./routes/dataRoutes.js"
import express from "express"

const app = express()

app.use(express.json())
app.use(dataRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`)
})