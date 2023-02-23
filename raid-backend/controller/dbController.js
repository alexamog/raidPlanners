const conn = require("../db-conn");

const dbController = {
    getAll: (req, res) => {
        const preparedStatement = "SELECT hangouts.hangout_id,hangouts.user_id,users.user_name, users.user_avatar, users.user_discriminator, hangouts.hangout_title, hangouts.hangout_description, hangouts.hangout_date, hangouts.hangout_location FROM hangouts INNER JOIN users ON hangouts.user_id = users.user_id;";
        conn.query(preparedStatement, (err, result) => {
            if (err) {
                res.status(500).json(err)
            }
            return res.json(result)
        })
    },
    addAttendee: (req, res) => {
        const attendeesVals = [req.body.userId, req.body.hangoutId];
        const preparedStatement = "INSERT INTO attendees(`user_id`,`hangout_id`) VALUES (?,?)";

        //Check if user is already added  
        conn.query("SELECT * FROM attendees WHERE user_id = ? AND hangout_id = ?", attendeesVals, (err, result) => {
            if (err) {
                res.status(500).json(err);
            }
            if (result.length == 0) {
                conn.query(preparedStatement, attendeesVals, (err, result) => {
                    if (err) {
                        res.status(500).json(err);
                    }
                    res.status(200).json(result);
                })
            }
            else {
                res.status(400).send("User Already added.")
            }
        })
    },
    deleteAttendee: (req, res) => {
        const preparedStatement = "DELETE FROM attendees WHERE user_id = ? AND hangout_id = ?";
        const attendeesVals = [req.body.userId, req.body.hangoutId];
        conn.query(preparedStatement, attendeesVals, (err, result) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(result);
        })
    },

    getAttendees: (req, res) => {
        const preparedStatement = "SELECT `user_id` FROM attendees WHERE hangout_id = ?";
        conn.query(preparedStatement, req.params.id, (err, result) => {
            if (err) {
                res.status(500).json(err);
            }
            const attendees = []
            for (const user of result) {
                attendees.push(user.user_id)
            }
            res.status(200).json(attendees);
        })
    },
    addCard: (req, res) => {
        const preparedStatement = "INSERT INTO hangouts(`user_id`, `hangout_title`, `hangout_description`,`hangout_date`,`hangout_location`) VALUES (?,?,?,?,?)";
        const preparedStatementInsert = "INSERT INTO attendees(`user_id`,`hangout_id`) VALUES (?,?)";

        const hangoutVals = [];
        for (const value of Object.values(req.body)) {
            hangoutVals.push(value);
        }

        conn.query(preparedStatement, hangoutVals, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            conn.query(preparedStatementInsert, [req.body.authorId, result.insertId], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(result)
            })
        })

    },
    updateCard: (req, res) => {
        const preparedStatement = "UPDATE hangouts SET ? = ? WHERE hangout_id = ?"
        res.send("update Card")
    },
    findOne: (req, res) => {
        const id = req.params.id
        const preparedStatement = "SELECT hangouts.hangout_id,hangouts.user_id,users.user_name, users.user_avatar, users.user_discriminator, hangouts.hangout_title, hangouts.hangout_description, hangouts.hangout_date, hangouts.hangout_location FROM hangouts INNER JOIN users ON hangouts.user_id = users.user_id where hangout_id = ?;"
        conn.query(preparedStatement, id, (err, result) => {
            if (err) {
                res.status(500).json(err)
            }
            res.json(result)
        })
    },
    dropCard: (req, res) => {
        const preparedStatement = "DELETE FROM hangouts WHERE hangout_id = ?";
        const preparedStatementDropAttendee = "DELETE FROM attendees WHERE hangout_id = ? "
        conn.query(preparedStatementDropAttendee, req.body.cardId, (err, result) => {
            if (err) {
                res.status(500).json(err);
            }
        })
        conn.query(preparedStatement, req.body.cardId, (err, result) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(result);
        })
    }
};

module.exports = dbController;