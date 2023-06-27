const User = require("../../models/User");
const createHttpError = require("http-errors");
const readUserController = async (req, res, next) => {
    try {
        //query
        const email = req.email

        //projection
        const projection = {password: 0, createdAt: 0, updatedAt: 0,__v:0}
        const user = await User.findOne({email}, projection);

        if (user?.email) {
            res.status(200).json({
                status: "success",
                data: user
            })
        } else {
            next(createHttpError(404, "User not Found!"))
        }
    } catch (err) {
        next(createHttpError(404, err.message))
    }
}
module.exports = readUserController