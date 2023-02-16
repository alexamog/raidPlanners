const express = require("express");
const { ensureAuthenticated } = require("../middleware/checkAuth");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("i am alive.");
})

router.get("/errorMock", (req, res) => {
    res.send("failed login.");
})

router.get("/successMock", ensureAuthenticated, (req, res) => {
    console.log(req.isAuthenticated())
    console.log(req.user)
    res.send({ "msg": "success login" })
})

module.exports = router;