const errorHandler = (err, req, res, next) => {
    try {
        if (res.headersSent) {
            return next(err)
        } else {
            const status = err.status || 500;

            if (err.message) {
                res.status(status).json({
                    status: "failed",
                    error: err.message,
                })
            } else {
                res.status(status).json({
                    status: "failed",
                    error: "Internal server error!",
                })
            }
        }
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = errorHandler