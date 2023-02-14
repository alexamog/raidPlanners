const passport = require("../middleware/passport");
const { database } = require("../mockModel/db");


const authController = {
    login: (req, res) => {
        res.render("auth/login");
    },
    dashboard: (req, res) => {
        res.render("./dashboard", { req });
    },
    register: (req, res) => {
        res.render("/register");
    },

    registerSubmit: async (req, res,) => {
        // implement
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
    discordLoginSubmit: passport.authenticate("discord", {
        successRedirect: "/discordMock",
        failureRedirect: "/errorMock",
    }),

    logout: (req, res) => {
        req.logout();
        res.redirect("/auth/login");
    },

};

module.exports = authController;