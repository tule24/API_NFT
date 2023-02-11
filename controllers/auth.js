const crypto = require('crypto')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthorizedError, NotFoundError } = require('../errors')
const catchAsync = require('../utils/Async')
const sendEmail = require('../utils/Email')
const register = catchAsync(async (req, res, next) => {
    const { name, email, wallet, password } = req.body
    if (!name || !email || !password || !wallet) {
        throw new BadRequestError('Please provide name, email, wallet & password')
    }
    const newUser = await User.create(req.body)
    sendUserInfo(res, newUser)
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email & password')
    }

    let user = await User.findOne({ email }).select("+password")
    if (!user) {
        throw new UnauthorizedError('Email not register. Please register by this email and login again')
    }

    let checkPassword = await user.checkPassword(password)
    if (!checkPassword) {
        throw new UnauthorizedError('Password not match. Please re-check password')
    }

    sendUserInfo(res, user)
})

const forgetPassword = catchAsync(async (req, res, next) => {
    // get the user based on the given email
    const user = await User.findOne(req.body)
    if (!user) {
        BadRequestError("Not found user with this email")
    }
    // create a random password
    const resetToken = await user.createPasswordResetToken()
    // send email back to user
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Foget your password? Submit a PATCH request with your new password and confirmPassword to: ${resetURL} \n If didn't forget your password, please ignor this email`

    await sendEmail({
        email: req.body.email,
        subject: "Your Password reset token (Valid for 10 min)",
        message
    })

    res.status(StatusCodes.OK).json({
        status: "message",
        message: "Token sent to email"
    })
})

const resetPassword = catchAsync(async (req, res, next) => {
    // get user based on the token
    const hashToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({ passwordResetToken: hashToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) {
        throw new Error("Reset token is invalid or has expired")
    }
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    sendUserInfo(res, user)
})

const changePassword = catchAsync(async (req, res, next) => {
    const { id } = req.user
    const user = await User.findById(id).select("+password")

    if (!user) {
        throw new NotFoundError(`Not found user with id ${id}`)
    }

    const { curPassword, newPassword } = req.body
    if (!curPassword || !newPassword) {
        throw new BadRequestError(`Please provide curPassword & newPassword`)
    }

    const checkPassword = await user.checkPassword(curPassword)
    if (!checkPassword) {
        throw new UnauthorizedError('Your current password not match. Please re-check password')
    }

    user.password = newPassword;
    await user.save()

    sendUserInfo(res, user)
})

const sendUserInfo = (res, user) => {
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            ava: user.ava,
            wallet: user.wallet
        },
        token: user.createJWT()
    })
}

module.exports = { register, login, forgetPassword, resetPassword, changePassword }