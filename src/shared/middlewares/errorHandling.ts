import { z, ZodError} from "zod"
import type { Request, Response, NextFunction } from "express"
import { baseError } from "../helper/errors.js"

const errorMid = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof ZodError) {
        return res.status(400).json({ message: error.message })
    }

    if (error instanceof baseError){
        return res.status(error.statusCode).json({ message: error.message })
    }

    console.error(error)
    return res.status(500).json({ message: "Internal Server Error" })

}

export default errorMid