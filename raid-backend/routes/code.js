const express = require("express");
const router = express.Router();
const codeController = require("../controller/codeController");
const { ensureAuthenticated } = require("../middleware/checkAuth");


router.post("/invite",codeController.invite );

module.exports = router;