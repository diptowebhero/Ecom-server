
const createHttpError = require('http-errors');
const User = require("../../models/User")
const {hashPassword} = require("../../helpers/hashPassword");
const registerController = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;


        const existsUser = await User.findOne({email});

        if (existsUser) {
            return res.status(200).json({
                status: "failed",
                data: 'User already exist!'
            })
        }

        //hash password
        const hashPass = await hashPassword(password);

        //create user
        const newUser = new User({
            name,
            email,
            password:hashPass
        });


        const user = await newUser.save();

        //send response
        res.status(200).json({
            status: "success",
            data: user
        })

    } catch (err) {
        if (err.message.includes("E11000 duplicate key error collection")) {
            next(createHttpError(200, "User already exists!"))
        }
        next(err)
    }
}
module.exports = registerController