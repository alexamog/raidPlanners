const express = require("express");
const router = express.Router();
const discord = require("../controller/discordController");

router.get("/getCards/:id", discord.getAll);
module.exports = router;