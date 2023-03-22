const conn = require("../db-conn");
const passport = require("../middleware/passport");


const authController = {
    checkUser: (req, res) => {
        res.send(req.user);
    },
    loginSubmit: passport.authenticate("local", {
        successRedirect: "/successMock",
        failureRedirect: "/errorMock",
    }),
    discordLogin: passport.authenticate("discord"),
    discordCB: passport.authenticate("discord", {
        successRedirect: "http://44.225.181.153/",
        failureRedirect: "/errorMock",
    }),

    logout: (req, res, next) => {
        // Set token to none and expire after 5 seconds
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    },
};

module.exports = authController;
