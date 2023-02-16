const passport = require("../middleware/passport");
const { database } = require("../mockModel/db");


const authController = {
    login: (req, res) => {
        res.render("auth/login");
    },
    dashboard: (req, res) => {
        console.log(req.isAuthenticated())
        res.set('Access-Control-Allow-Origin', '*');
        res.send({ "msg": "This has CORS enabled 🎈" })
        // res.set('Access-Control-Allow-Origin', '*')
    },
    register: (req, res) => {
        res.render("/register");
    },
    registerSubmit: (req, res) => {
        const userInput = req.body;
        database.push({
            name: userInput.email.split("@")[0],
            email: userInput.email,
            password: userInput.password,
        });

        res.redirect("/auth/login");
    },

    loginSubmit: passport.authenticate("local", {
        successRedirect: "/successMock",
        failureRedirect: "/errorMock",
    }),
    discordLogin: passport.authenticate("discord"),
    discordCB: passport.authenticate("discord", {
        successRedirect: "http://localhost:5173/hangouts",
        failureRedirect: "/errorMock",
    }),

    logout: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.send("Logged out.")
        });
    },
};

module.exports = authController;