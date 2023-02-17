const authController = require("../controller/authController");
const checkAuth = require("../middleware/checkAuth");
const express = require("express");
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/checkAuth");
const router = express.Router();

//for actual controller
router.post("/login", forwardAuthenticated, authController.loginSubmit);
router.post("/register", forwardAuthenticated, authController.registerSubmit);
router.get("/logout", ensureAuthenticated, authController.logout);

router.get('/discord', authController.discordLogin);
router.get('/discord/callback', authController.discordCB);

router.get("/user", ensureAuthenticated, authController.checkUser)

module.exports = router;