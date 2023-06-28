const createHttpError = require("http-errors");
const Product = require("./../../models/Product");

const listOfProduct = async (req, res, next) => {
    try {
        const product = await Product.find({})
            .populate("category")
            .select("-photo").limit(12)
            .sort({createdAt: -1});

        //send response
        res.status(200).json({
            status: "success",
            data: product
        })
    } catch (err) {
        next(createHttpError(500, err.message))
    }
}

const getPhoto = async (req, res, next) => {
    try {
        const {productId} = req.params
        const product = await Product.findById(productId)
            .select("photo");

        //send response
        if (product.photo.data) {
            res.set("Content-tpe", product.photo.contentType);
            res.set("Cross-Origin-Resource-Policy", "cross-origin")
            return res.send(
                product.photo.data
            )
        }
    } catch (err) {
        next(createHttpError(500, err.message))
    }
}

module.exports = {listOfProduct, getPhoto}