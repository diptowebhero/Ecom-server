const {Router}= require("express");
const router = Router();

//external imports
const checkLogin = require("../middlewares/auth/checkLogin");
const checkAdmin = require("../middlewares/auth/checkAdmin");
const createCategory = require("../controllers/categories/createCategory");
const deleteCategory = require("../controllers/categories/deleteCategory");
const getAllCategory = require("../controllers/categories/getAllCategory");
const updateCategory = require("../controllers/categories/updateCategory");
const getCategoryBySlug = require("../controllers/categories/getCategoryBySlug");

//create category
router.post("/category",checkLogin,checkAdmin,createCategory)

//get all category
router.get("/allCategory",checkLogin,checkAdmin,getAllCategory)

//get by slug category
router.get("/category/:slug",checkLogin,checkAdmin,getCategoryBySlug)

//update category
router.put("/updateCategory/:slug",checkLogin,checkAdmin,getCategoryBySlug)


//delete category
router.delete("/deleteCategory/:categoryId",checkLogin,checkAdmin,deleteCategory)


module.exports = router