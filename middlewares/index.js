const notFoundMiddleware = require('./not-found')
const errorHandlerMiddleware = require('./error-handler')
const authMiddleware = require('./auth')
const restrictMiddleware = require('./restrict')

module.exports = { notFoundMiddleware, errorHandlerMiddleware, authMiddleware, restrictMiddleware }
