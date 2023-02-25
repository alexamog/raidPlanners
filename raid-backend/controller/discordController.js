const conn = require("../db-conn");

const discordController = {
    getAll: (req, res) => {
        const id = req.params.id
        const preparedStatement = "SELECT hangout_title, hangout_location, hangout_date, users.user_name FROM hangouts INNER JOIN attendees ON hangouts.hangout_id = attendees.hangout_id INNER JOIN users ON hangouts.user_id = users.user_id WHERE attendees.user_id = ?;        ";
        conn.query(preparedStatement, id, (err, result) => {
            if (err) {
                res.status(500).json(err)
            }
            return res.json(result)
        })
    }
};

module.exports = discordController;