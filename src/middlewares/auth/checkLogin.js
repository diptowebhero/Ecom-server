const jwt = require("jsonwebtoken")
const createHttpError = require("http-errors")
const checkLogin = async (req, res, next) => {
    try {
        const token = req.headers['token'];

        if (token) {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            const {email, userId} = decode;
            req.email = email;
            req.userId = userId;
            next()
        } else {
            next(createHttpError(401, "Unauthorized User!"))
        }
    } catch (err) {
        if(err.message===" Invalid Signature"){
            next(createHttpError(401, "Unauthorized User!"))
        }
        next(createHttpError(401,err.message))
    }
}
module.exports = checkLogin