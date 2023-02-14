const authController = require("../controller/authController");
const express = require("express");
const router = express.Router();


// router.post("/login", (req, res, next) => {
//     console.log(req.body)
//     const email = req.body.email;
//     const passwd = req.body.password;
//     console.log(req.body)
//     mockupDB.filter((acc) => {
//         if (acc.email == email && acc.password == passwd) {
//             return res.send({
//                 "token": "token_here",
//                 "profileInfo": {
//                     "firstName": acc.firstName,
//                     "lastName": acc.lastName
//                 }
//             });
//         }
//     })
// });


//for actual controller
router.post("/login", authController.loginSubmit);
// router.post("/register", authController.register);

module.exports = router;