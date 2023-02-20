const express = require("express");
const router = express.Router();
const dbController = require("../controller/dbController");
const { ensureAuthenticated } = require("../middleware/checkAuth");


router.get("/mock/:id", dbController.findOne);
router.get("/getall", ensureAuthenticated,dbController.getAll);

router.post("/addCard",ensureAuthenticated ,dbController.addCard);
router.post("/dropCard", ensureAuthenticated,dbController.dropCard);
router.post("/updateCard",ensureAuthenticated ,dbController.updateCard);

router.post("/addAttendee",ensureAuthenticated,dbController.addAttendee);
router.post("/deleteAttendee",ensureAuthenticated,dbController.deleteAttendee);

module.exports = router;