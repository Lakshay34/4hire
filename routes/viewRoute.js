const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require('./../controllers/authController');

router.get("/", viewController.getlandingpage);
router.get("/2", viewController.getlandingpage2);
router.get("/register", viewController.getregisterForm);
router.get("/login", authController.isLoggedIn, viewController.getloginForm);
router.get("/profile", authController.isLoggedIn, viewController.getprofile);
router.get("/forgotpassword", viewController.getforgotPass);
router.get("/resetpassword", viewController.getforgotPass2);
router.get("/passsuccess", viewController.getforgotPassSuccess);
router.get("/user", viewController.getapplieduser);
module.exports = router;
