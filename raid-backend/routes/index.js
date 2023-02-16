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
    res.send({ "msg": "success login" })
})

router.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
module.exports = router;