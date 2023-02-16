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
        const user = userController.getUserById(profile.id)
        return done(null, user);
    }
)

const localLogin = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        const user = userController.getUserByEmailIdAndPassword(email, password);
        return user
            ? done(null, user)
            : done(null, false, {
                message: "Your login details are not valid. Please try again",
            });
    }
);

passport.serializeUser((user, done) => {
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

module.exports = passport.use(localLogin).use(discordLogin);
