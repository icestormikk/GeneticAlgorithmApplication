export class UnreachableEndError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnreachableEndError.prototype)
    }
}