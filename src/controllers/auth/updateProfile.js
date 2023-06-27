const createHttpError = require("http-errors")
const User = require("./../../models/User")
const {hashPassword} = require("../../helpers/hashPassword");
const updateProfile = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findById(req.userId);

        //hash password
        const hashPass = password ? await hashPassword(password) : undefined;

        const updatedUser = await User.findByIdAndUpdate(req.userId, {
            name: name || user?.name,
            email: email || user?.email,
            password: hashPass || user?.password
        },{new:true})

        //send updated data
        res.status(200).json({
            status:"success",
            data:updatedUser
        })



    } catch (err) {
        next(createHttpError(500, err.message))
    }
}
module.exports = updateProfile