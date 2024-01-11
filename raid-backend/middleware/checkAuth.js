module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.send("Not logged in");
    },
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            console.log(req.isAuthenticated())
            return next();
        }
        res.send("Already logged in");
    }
};