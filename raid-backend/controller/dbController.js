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
    addAttendee: (req,res) =>{
        const attendeesVals = [req.body.userId, req.body.hangoutId];
        const preparedStatement = "INSERT INTO attendees(`user_id`,`hangout_id`) VALUES (?,?)";

        //Check if user is already added  
        conn.query("SELECT * FROM attendees WHERE user_id = ? AND hangout_id = ?",attendeesVals,(err,result)=>{
            if(err){
                res.status(500).json(err);
            }
            if(result.length == 0){
                conn.query(preparedStatement,attendeesVals, (err,result)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    res.status(200).json(result);
                })
            }
            else{
                res.status(400).send("User Already added.")
            }
        })
    },
    deleteAttendee: (req,res) =>{
        const preparedStatement = "DELETE FROM attendees WHERE user_id = ? AND hangout_id = ?";
        const attendeesVals = [req.body.userId, req.body.hangoutId];
        conn.query(preparedStatement,attendeesVals, (err,result)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json(result);
        })
    },
    addCard: (req, res) => {
        const preparedStatement = "INSERT INTO hangouts(`hangout_authorId`, `hangout_title`, `hangout_description`,`hangout_date`,`hangout_location`) VALUES (?,?,?,?,?)";
        const preparedStatementInsert = "INSERT INTO attendees(`user_id`,`hangout_id`) VALUES (?,?)";

        const hangoutVals = [];
        for (const value of Object.values(req.body)) {
            hangoutVals.push(value);
        }

        conn.query(preparedStatement, hangoutVals, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            conn.query(preparedStatementInsert, [req.body.authorId,result.insertId], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.send.status(200).json(result)
            })
        })

    },
    updateCard: (req, res) => {
        res.send("update Card")
    },
    findOne: (req, res) => {
        const id = req.params.id
    },
    dropCard: (req,res) =>{
        const preparedStatement = "DELETE FROM hangouts WHERE hangout_id = ?";
        conn.query(preparedStatement,req.body.cardId,(err,result)=>{
            if(err){
                res.status(500).json(err);
            }
            res.json(result);
        })
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