const express = require("express");
const router = express.Router();
const dbController = require("../controller/dbController");

router.get("/mock/:id", dbController.db)

module.exports = router;