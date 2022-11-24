const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require('./../controllers/authController');

// Outer Pages Routes
router.get("/", viewController.getlandingpage);
router.get("/register", viewController.getregisterForm);
router.get("/login", authController.isLoggedIn, viewController.getloginForm);
router.get("/forgotpassword", viewController.getforgotPass);

// User Pages Routes
router.get("/home", authController.isLoggedIn, viewController.getHome)
router.get("/task", authController.isLoggedIn, viewController.getTask)
router.get("/profile", authController.isLoggedIn, viewController.getprofile);
router.get("/editprofile", authController.isLoggedIn, viewController.getEditUser);
router.get("/applieduser", authController.isLoggedIn, viewController.getprofileofappliedusers);


// Admin Pages Routes
router.get('/admin', viewController.getAdminLogin)
router.get('/adminprofile',authController.protect, authController.restrictTo("admin"), viewController.getAdminProfile)
router.get('/adminUsers', authController.protect, authController.restrictTo("admin"), viewController.getAdminUser)
router.get('/adminTasks', authController.protect, authController.restrictTo("admin"), viewController.getAdminTask)
module.exports = router;
