const createHttpError = require("http-errors")
const Category = require("./../../models/Category")
const slugify = require("slugify");
const createCategory = async (req, res, next) => {
    try {
        const {name} = req.body;

        const existCategory = await Category.findOne({name});

        if (existCategory) {
            return res.status(200).json({
                status: "failed",
                data: "Category is already exists!"
            })
        }

        const newCategory = new Category({
            name,
            slug: slugify(name)
        });

        const category = await newCategory.save();

        //send response
        res.status(200).json({
            status: "success",
            data: category
        })

    } catch (err) {
        next(createCategory(200, err.message))
    }
}
module.exports = createCategory