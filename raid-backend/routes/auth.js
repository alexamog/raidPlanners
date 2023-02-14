const authController = require("../controller/authController");
const express = require("express");
const router = express.Router();
const { forwardAuthenticated } = require("../middleware/checkAuth");

//for actual controller
router.post("/login", authController.loginSubmit);
// router.post("/register", authController.register);

module.exports = router;