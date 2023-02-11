require('dotenv').config()
const express = require("express")
const path = require('path')
const nftMarketRouter = require('../routes/nftMarketplace')
const usersRouter = require('../routes/users')
const connectDB = require('../db/connect')
const {notFoundMiddleware, errorHandlerMiddleware} = require('../middlewares')
const morgan = require('morgan')

const app = express()
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev")) // req logger
}

// unhandledrejection là sự kiện được gọi khi không có hàm reject nào bắt promise khi nó bị reject.
process.on("unhandledRejection", err => {
    console.log(err.name, err.message)
    console.log("UnhandleRejection shutting down application")
    process.exit(1)
})


// SERVING TEMPLATE DEMO
const publicPathDirectory = path.join(__dirname, '../nft-data/img')
app.use('/image', express.static(publicPathDirectory))

// routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/nftMarket', nftMarketRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

