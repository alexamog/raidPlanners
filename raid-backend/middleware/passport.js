const passport = require("passport");
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
    async (accessToken, refreshToken, profile, done) => {
        const user = await userController.findUser(profile.id)
        if(user == undefined){
            userController.adduser(profile)
            const newUser = await userController.findUser(profile.id)
            return done(null,newUser)
        }
        else{
            return done(null, user);
        }
    }
)
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userController.findUser(id)
    if (user) {
        console.log(user)
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(discordLogin);
