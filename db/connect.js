const mongoose = require('mongoose')

const connectDB = async (uri) => {
    mongoose.set('strictQuery', false) // strictQuery mode for schemas
    return mongoose
        .connect(uri)
        .then(() => console.log("CONNECT TO THE DB ..."))
        .catch((err) => console.log(err))
} 

module.exports = connectDB