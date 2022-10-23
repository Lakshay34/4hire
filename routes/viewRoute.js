const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");

router.get("/", viewController.getlandingpage);
router.get("/register", viewController.getregisterForm);
router.get("/login", viewController.getloginForm);
module.exports = router;
