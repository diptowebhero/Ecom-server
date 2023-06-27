const {Router} = require("express");
const router = Router();

//external import
const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const readUserController = require("../controllers/auth/readUserController");
const checkLogin = require("../middlewares/auth/checkLogin");
const updateProfile = require("../controllers/auth/updateProfile");
const checkAdmin = require("../middlewares/auth/checkAdmin");


//register route
router.post("/register",registerController);

//login route
router.post("/login",loginController);

//read user route
router.get("/readUser",checkLogin,checkAdmin,readUserController);

//update profile route
router.put("/updateProfile",checkLogin,updateProfile);




module.exports = router



