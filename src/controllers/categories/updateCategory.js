const createHttpError = require("http-errors");
const Categories = require("../../models/Category");
const slugify = require("slugify");

const updateCategory = async (req, res, next) => {
    try {
        const {name} = req.body;
        const categoryId= req.params.id

        const category = await Categories.findOneAndUpdate({categoryId}, {$set: {name,slug:slugify(name)}}, {new: true});

        if (!category) {
            return res.status(200).json({
                status: "failed",
                data: "categories not found!"
            })
        }

        return res.status(200).json({
            status: "success",
            data: category
        })
    } catch (err) {
        next(createHttpError(500, err.message))
    }
}

module.exports = updateCategory