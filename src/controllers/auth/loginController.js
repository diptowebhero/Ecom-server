const {comparePasswords} = require("../../helpers/hashPassword")
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        //get user
        const user = await User.findOne({email})

        if (user?._id && typeof user === "object") {
            //compare password
            const isMatch = await comparePasswords(password, user?.password);
            if (isMatch) {
                //generate token
                const payload = {email: user?.email, userId: user?._id}
                const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})

                //send response
                res.status(200).json({
                    status: "success",
                    token
                })

            } else {
                res.status(200).json({
                    status: "failed",
                    msg: "Password doesn't match!"
                })
            }
        } else {
            res.status(200).json({
                status: "failed",
                msg: "User not found!"
            })
        }
    } catch (err) {
        next(err)
    }
}
module.exports = loginController