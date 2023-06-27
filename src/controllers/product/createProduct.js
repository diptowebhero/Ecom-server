const createHttpError = require("http-errors");
const {readFileSync} = require("fs");
const Product = require("./../../models/Product");
const slugify = require("slugify");

const createProduct = async (req, res, next) => {

    try {
        const {name} = req.fields
        const {photo} = req.files;

        // if (photo && photo.size > 1000000) {
        //     return res.json({
        //         err: "Image should be less than 1mb in size"
        //     })
        // }

        const newProduct = new Product({...req.fields, slug: slugify(name)});

        if (photo) {
            newProduct.photo.data = readFileSync(photo.path);
            newProduct.photo.contentType = photo.type
        }

        const product = await newProduct.save();
        if (product) {
         return res.status(200).json({
                status: "success",
                data: product
            })
        }

        res.status(200).json({
            status: "failed",
            data: "Failed create product!"
        })
    } catch (err) {
        next(createHttpError(500, err.message))
    }
}
module.exports = createProduct