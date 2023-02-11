const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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
        maxlength: 18,
        select: false
    },
    role: {
        type: String, 
        default: "user",
        enum: ["user", "admin"]
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next() // khi trường password modify thì chạy các lệnh tiếp theo ko thì next

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            userId: this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    )
}

userSchema.methods.checkPassword = async function (password) {
    const check = await bcrypt.compare(password, this.password)
    return check
}

userSchema.methods.checkPasswordChange = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimestamp < changedTimestamp
    }
    // by default user not change password
    return false
}

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    await this.save()
    console.log("resetToken", resetToken)
    console.log("passwordResetToken", this.passwordResetToken)
    return resetToken
}

module.exports = mongoose.model('User', userSchema)