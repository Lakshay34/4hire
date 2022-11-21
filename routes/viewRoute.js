const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require('./../controllers/authController');

router.get("/", viewController.getlandingpage);
router.get("/register", viewController.getregisterForm);
router.get("/login", authController.isLoggedIn, viewController.getloginForm);
router.get("/profile", authController.isLoggedIn, viewController.getprofile);
router.get("/forgotpassword", viewController.getforgotPass);
router.get("/resetpassword", viewController.getforgotPass2);
router.get("/passsuccess", viewController.getforgotPassSuccess);


router.get('/admin', viewController.getAdminLogin)
router.get('/adminprofile', viewController.getAdminProfile)
router.get('/adminUsers', viewController.getAdminUser)
router.get('/adminTasks', viewController.getAdminTask)
module.exports = router;
