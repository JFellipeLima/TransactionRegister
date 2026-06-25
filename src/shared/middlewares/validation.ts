import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

interface ValidationSchemas {
    body?: ZodType<any>;
    query?: ZodType<any>;
    params?: ZodType<any>;
}

const validation = (schemas: ValidationSchemas) => (req: Request, res: Response, next: NextFunction) => {
    if (schemas.params) {
        req.params = schemas.params.parse(req.params) as any
    }
    if (schemas.query) {
        res.locals.query = schemas.query.parse(req.query)
    }
    if (schemas.body) {
        req.body = schemas.body.parse(req.body)
    }

    next();
};

export default validation;