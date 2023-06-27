const createHttpError = require('http-errors');

//Not Found Handler
const notFoundHandler = (req, res, next) => {
    next(createHttpError(401, "Your requested URL is not found!"))
}
module.exports=notFoundHandler