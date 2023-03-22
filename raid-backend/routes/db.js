const express = require("express");
const router = express.Router();
const dbController = require("../controller/dbController");
const { ensureAuthenticated } = require("../middleware/checkAuth");


router.get("/card/:id", dbController.findOne);
router.get("/getall", dbController.getAll);

router.post("/addCard", ensureAuthenticated, dbController.addCard);
router.delete("/dropCard", ensureAuthenticated, dbController.dropCard);
router.post("/updateCard", ensureAuthenticated, dbController.updateCard);
router.post("/editCard", ensureAuthenticated, dbController.updateCard);


router.post("/addAttendee", ensureAuthenticated, dbController.addAttendee);
router.delete("/deleteAttendee", ensureAuthenticated, dbController.deleteAttendee);
router.get("/getAttendees/:id", dbController.getAttendees);
module.exports = router;