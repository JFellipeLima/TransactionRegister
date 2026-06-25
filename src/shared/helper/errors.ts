export class baseError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, baseError.prototype);
    }
}

export class NotFoundError extends baseError {
    constructor(message: string = "Resource not found") {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class InvalidDataError extends baseError {
    constructor(message: string = "Invalid data provided") {
        super(message, 400);
        Object.setPrototypeOf(this, InvalidDataError.prototype);
    }
}