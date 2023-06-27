const createHttpError = require("http-errors");
const Categories = require("./../../models/Category");

const getCategoryBySlug = async (req, res, next) => {
    try {
        const {slug} = req.params;

        const categories = await Categories.findOne({slug});

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

module.exports = getCategoryBySlug