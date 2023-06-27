const {Router}= require("express");
const formidable = require("express-formidable");
const router = Router();

//external imports
const createProduct = require("../controllers/product/createProduct");

//create product
router.post('/createProduct',formidable(),createProduct)

module.exports = router