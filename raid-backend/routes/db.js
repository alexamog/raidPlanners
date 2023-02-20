const express = require("express");
const router = express.Router();
const dbController = require("../controller/dbController");

router.get("/mock/:id", dbController.findOne);
router.get("/getall", dbController.getAll);
router.post("/addCard", dbController.addCard);
router.post("/updateCard", dbController.updateCard);
router.post("/addAttendee",dbController.addAttendee);
router.post("/deleteAttendee",dbController.deleteAttendee);

module.exports = router;