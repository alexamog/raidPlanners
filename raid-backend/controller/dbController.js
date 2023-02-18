const conn = require ("../../mysql/data");
const { query } = require("../db-conn");

const dbController = {
    db: (req, res) => {
        const id = req.params.id
        res.send({
            id: id,
            author: "Bry-guy",
            authorId: "100319324333432832",
            discriminator: "831",
            avatar: "a57b03dcb179eb2ca827f55fbb828b08",
            title: "Raid Event",
            description: "Raid with the boys!",
            datetime: "2023-01-14T15:40",
            location: "432  Street",
            attending: []
        });
    },

    getHangoutByID: (req, res) =>  {
        const qText = "select * from `hangouts` where `id` = ?";
        const qVals  = [req.id];

        conn.query(qText, qVals,             
        (err, result) => {
            if (err) {
                return res.json(err);
            };

            if (result.length < 1 ) {
                return res.json("Hangout does not exist.");
            };

            return res.json(result);
        });
    },

    getHangoutsByTitle: (req, res) =>  {
        const qText = "select * from `hangouts` where title like %?%";
        const qVals  = [req.title];

        conn.query(qText, qVals,             
        (err, result) => {
            if (err) {
                return res.json(err);
            };

            if (result.length < 1 ) {
                return res.json("Hangout does not exist.");
            };

            return res.json(result);
        });
    },

    getHangoutsByDate: (req, res) => {
        const qText = "select * from `hangouts` where datetime >= ?T00:00:00.000 \
                                                  and datetime <= ?T23:59:59.999";
        // No need to specify time; 
        const qVals  = [req.day];

        conn.query(qText, qVals,             
        (err, result) => {
            if (err) {
                return res.json(err);
            };

            if (result.length < 1 ) {
                return res.json("Hangout does not exist.");
            };

            return res.json(result);
        });
    },

    // void
    addHangout: (res, req) => {
        const qText = "select `hTitle` from `hangouts` where title like ?";
        const qVals  = [req.title];

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
            const qqVals  = [req.hAuthor, 
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