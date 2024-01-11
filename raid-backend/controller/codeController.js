
const codeController = {
    invite: (req, res) => {
        console.log(req.body.inviteCode)
        res.send("Payload test")
    }
};

module.exports = codeController;