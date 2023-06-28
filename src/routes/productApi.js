const {Router}= require("express");
const formidable = require("express-formidable");
const router = Router();

//external imports
const createProduct = require("../controllers/product/createProduct");
const checkLogin = require("../middlewares/auth/checkLogin");
const checkAdmin = require("../middlewares/auth/checkAdmin");
const {listOfProduct, getPhoto} = require("../controllers/product/listOfProduct");
const readProductBySlug = require("../controllers/product/readProductBySlug");
const deleteProduct = require("../controllers/product/deleteProduct");
const updateProduct = require("../controllers/product/updateProduct");

//create product
router.post('/createProduct',checkLogin,checkAdmin,formidable(),createProduct);

//get list of product
router.get("/list",checkLogin,checkAdmin,listOfProduct);

//get list of product
router.get("/product/:slug",checkLogin,readProductBySlug);

//get product photo
router.get("/photo/:productId",checkLogin,getPhoto);


//update product
router.put("/product/:productId",checkLogin,formidable(),updateProduct);

//get list of product
router.delete("/product/:productId",checkLogin,deleteProduct);



module.exports = router