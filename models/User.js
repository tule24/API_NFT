const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"]
    },
    wallet: {
        type: String,
        require: [true, "Please provide wallet address"],
        unique: true
    },
    email: {
        type: String,
        require: [true, "Please provide wallet address"],
        unique: true,
        validator: [validator.isEmail, "Invalid email"]
    },
    ava: {
        type: String,
        default: "avatar.png"
    },
    password: {
        type: String,
        require: [true, "Please provide password"],
        minlength: 6,
        maxlength: 18
    },
    passwordConfirmed: {
        type: String,
        require: [true, "Please provide password confirm"],
        validator: {
            validate: function(val) {
                return this.password === val
            },
            message: "Password confirm not match password"
        }
    }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)