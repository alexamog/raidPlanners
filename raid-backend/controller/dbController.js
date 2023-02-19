const conn = require("../db-conn");

const dbController = {
    getAll: (req, res) => {
        const preparedStatement = "SELECT * FROM hangouts";
        conn.query(preparedStatement, (err, result) => {
            if (err) {
                res.status(500).json(err)
            }
            return res.json(result)
        })
    },
    addCard: (req, res) => {
        const preparedStatement = "INSERT INTO hangouts(`hangout_authorId`, `hangout_title`, `hangout_description`,`hangout_date`,`hangout_location`) VALUES (?,?,?,?,?)";
        const hangoutVals = []

        for (const [key, value] of Object.entries(req.body)) {
            hangoutVals.push(value)
        }

        conn.query(preparedStatement, hangoutVals, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.json(result)
        })
    },
    updateCard: (req, res) => {
        res.send("update Card")
    },
    findOne: (req, res) => {
        const id = req.params.id
    },

    getHangoutByID: (req, res) => {
        const qText = "select * from `hangouts` where `id` = ?";
        const qVals = [req.id];

        conn.query(qText, qVals,
            (err, result) => {
                if (err) {
                    return res.json(err);
                };

                if (result.length < 1) {
                    return res.json("Hangout does not exist.");
                };

                return res.json(result);
            });
    },

    getHangoutsByTitle: (req, res) => {
        const qText = "select * from `hangouts` where title like %?%";
        const qVals = [req.title];

        conn.query(qText, qVals,
            (err, result) => {
                if (err) {
                    return res.json(err);
                };

                if (result.length < 1) {
                    return res.json("Hangout does not exist.");
                };

                return res.json(result);
            });
    },

    getHangoutsByDate: (req, res) => {
        const qText = "select * from `hangouts` where datetime >= ?T00:00:00.000 \
                                                  and datetime <= ?T23:59:59.999";
        // No need to specify time; 
        const qVals = [req.day];

        conn.query(qText, qVals,
            (err, result) => {
                if (err) {
                    return res.json(err);
                };

                if (result.length < 1) {
                    return res.json("Hangout does not exist.");
                };

                return res.json(result);
            });
    },

    // void
    addHangout: (res, req) => {
        const qText = "select `hTitle` from `hangouts` where title like ?";
        const qVals = [req.title];

        conn.query(qText, qVals,
            (err, result) => {
                if (err) {
                    return res.json(err);
                };

                if (result.length > 0) {
                    return res.status(400).json("Hangout with the same name already exists.");
                };

                const qqText = "insert into hangouts (hAuthor, hTitle, hDesc, hDate, hLocation)\
                                        values   (?)"
                const qqVals = [req.hAuthor,
                req.hTitle,
                req.hDesc,
                req.hDate,
                req.hLocation]

                conn.query(qqText, qqVals,
                    (err, result) => {
                        if (err) {
                            return res.status(200).json(err);
                        };

                        return res.json("Hangout added.")
                    });
            });
    },
};

module.exports = dbController;