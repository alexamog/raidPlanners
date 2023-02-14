const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const DiscordStrategy = require('passport-discord').Strategy;
const process = require("process");
const dotenv = require('dotenv');
dotenv.config();

const localLogin = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        const user = userController.getUserByEmailIdAndPassword(email, password);
        console.log(user)
        return user
            ? done(null, user)
            : done(null, false, {
                message: "Your login details are not valid. Please try again",
            });
    }
);

const discordLogin = new DiscordStrategy(
    {
        // The Client Id for your discord application (See "Discord Application Setup")
        clientID: process.env.CLIENT_ID,

        // The Client Secret for your discord application (See "Discord Application Setup")
        clientSecret: process.env.TOKEN_SECRET,

        // The callback URL - Your app should be accessible on this domain. You can use
        // localhost for testing, just makes sure it's set as a Redirect URL (See "Discord Application Setup")
        callbackURL: process.env.CALLBACK_URL,

        /* Optional items: */

        // The scope for your OAuth request - You can use strings or Scope values
        // The default scope is Scope.IDENTIFY which gives basic profile information
        scope: [Scope.EMAIL]

    },
    (accessToken, refreshToken, profile, done) => {

        // `accessToken` is the discord API access token for this user
        // `refreshToken` is the discord API refresh token for this user

        // If you want to pull more information about the user, use the access token to pull it from the Discord API
        // IMPORTANT: `discord-passport` is NOT an API library - it's an Oauth Strategy. If you want to interact with the
        // Discord API to get Guilds, etc, you will need to use the `accessToken` and make the requests yourself.

        // `profile` will be the user's standardized oauth profile
        console.log(profile);

        // `profile.discord` will be the user's unmodified Discord profile as returned by the Discord API.

        // You should use this data to create or update the user's information in your database, and then return
        // the user using `done`.
        done(null, ExampleUserStore.getOrCreateUserFromProfile(accessToken, refreshToken, profile));

    }
)

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin).use(discordLogin);
