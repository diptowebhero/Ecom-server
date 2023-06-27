const createHttpError = require("http-errors")
const User = require("./../../models/User")
const checkAdmin = async (req, res, next) => {
    try {
        const email = req.email
        const user = await User.findOne({email}, {password: 0, name: 0, __v: 0});

        if(user?.role=== "admin"){
            next()
        }else{
            next(createHttpError(500, "Unauthorized User"))
        }

    } catch (err) {
        next(createHttpError(500, err.message))
    }
}
module.exports = checkAdmin