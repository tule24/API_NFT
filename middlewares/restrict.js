const { RestrictError } = require('../errors')

const restrict = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new RestrictError("You have not permission to do this function"))
        }
        next()
    }
}

module.exports = restrict