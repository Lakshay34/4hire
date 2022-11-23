const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require('./../controllers/authController');

router.get("/", viewController.getlandingpage);
router.get("/register", viewController.getregisterForm);
router.get("/login", authController.isLoggedIn, viewController.getloginForm);
router.get("/profile", authController.isLoggedIn, viewController.getprofile);
router.get("/applieduser", viewController.getprofileofappliedusers);
router.get("/forgotpassword", viewController.getforgotPass);


router.get('/admin', viewController.getAdminLogin)
router.get('/adminprofile',authController.protect, authController.restrictTo("admin"), viewController.getAdminProfile)
router.get('/adminUsers', authController.protect, authController.restrictTo("admin"), viewController.getAdminUser)
router.get('/adminTasks', authController.protect, authController.restrictTo("admin"), viewController.getAdminTask)
module.exports = router;
