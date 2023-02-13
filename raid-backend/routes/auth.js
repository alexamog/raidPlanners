// const authController = require("../controller/authController.js");
const express = require("express");
const router = express.Router();


const mockupDB = [
    {
        "username": "bleulenny",
        "email": "aamog@my.bcit.ca",
        "password": "123",
        "firstName": "Alex",
        "lastName": "Amog"
    },
    {
        "username": "bryancampos",
        "email": "bryancampos@gmail.com",
        "password": "123",
        "firstName": "Bryan",
        "lastName": "Campos"
    },
]

router.post("/login", (req, res, next) => {
    console.log(req.body)
    const email = req.body.email;
    const passwd = req.body.password;
    console.log(req.body)
    mockupDB.filter((acc) => {
        if (acc.email == email && acc.password == passwd) {
            return res.send({
                "token": "token_here",
                "profileInfo": {
                    "firstName": acc.firstName,
                    "lastName": acc.lastName
                }
            });
        }
    })
});


//for actual controller
// router.post("/login", authController.login);
// router.post("/register", authController.register);

module.exports = router;