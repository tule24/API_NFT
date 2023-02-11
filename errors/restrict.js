const CustomAPIError = require("./custom-error");
const { StatusCodes } = require('http-status-codes')

class RestrictError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = RestrictError