const Categories = require("../../models/Category");
const createHttpError = require("http-errors")
const deleteCategory = async (req,res,next)=>{
    try{
        const categoryId = req.params.id;
        const category = await Categories.findOneAndDelete({categoryId});

        res.status(200).json({
            status:'success',
            data:category
        })
    }
    catch (err) {
        next(createHttpError(500,err.message))
    }
}
module.exports = deleteCategory