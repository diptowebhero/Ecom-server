const createHttpError = require("http-errors");
const Categories = require("./../../models/Category");

const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Categories.find({});

        if (!categories) {
            return res.status(200).json({
                status: "failed",
                data: "categories not found!"
            })
        }

        return res.status(200).json({
            status: "success",
            data: categories
        })
    } catch (err) {
        next(createHttpError(500, err.message))
    }
}

module.exports=getAllCategory