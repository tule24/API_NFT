require('dotenv').config()
const express = require("express")
const app = express()
const connectDB = require('../db/connect')

app.use(express.json())

// routes
app.use('/api/v1/nftMarket')

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
