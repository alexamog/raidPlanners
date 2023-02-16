const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const userController = require("../controller/userController");
const process = require("process");
const dotenv = require('dotenv');
dotenv.config();

const discordLogin = new DiscordStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.TOKEN_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ['identify', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
        const user = userController.getUserByIdOrAdd(profile)
        if (user != null) {
            return done(null, user);
        }
    }
)
passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(discordLogin);
