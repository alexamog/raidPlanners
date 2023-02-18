const conn = require ("../../mysql/data");
const { query } = require("../db-conn");

const fakeDB = [
    {
        id: "1",
        author: "Bry-guy",
        authorId: "100319324333432832",
        discriminator: "831",
        avatar: "a57b03dcb179eb2ca827f55fbb828b08",
        title: "Raid Event",
        description: "Raid with the boys!",
        datetime: "2023-01-14T15:40",
        location: "432  Street",
        attending: []
    },
    {
        id: "2",
        author: "Bry-guy",
        authorId: "165897917004120064",
        discriminator: "831",
        avatar: "2795e49b4d786de5cf5953cf592c1b4f",
        title: "Leetcode grind time",
        description: "Practice Leetcode",
        datetime: "2023-03-23T15:40",
        location: "Discord (Online)",
        attending: [165897917004120064]
    }
]

const dbController = {
    getAll: (req,res)=>{
        res.send()
    },
    addCard: (req,res)=>{
        res.send("Add card route")
    },
    updateCard: (req,res)=>{
        res.send("update Card")
    },
    findOne: (req, res) => {
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

    /** 
     * gets a hangout object by id
     * 
     * @param {string} id 
     * @returns {Hangout} A hangout object of the matching ID
     */
     getHangoutByID: (req, res) =>  {
        qText = "select * from `hangouts` where `id` = ?";
        vals  = [req.id]

        conn.query(qText, vals,             
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
        qText = "select * from `hangouts` where title like %?%";
        vals  = [req.title]

        conn.query(qText, vals,             
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
        qText = "select * from `hangouts` where datetime >= ?T00:00:00.000 \
                                            and datetime <= ?T23:59:59.999";

        // No need to specify time; 
        vals  = [req.day]

        conn.query(qText, vals,             
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
        
    },
};

module.exports = dbController;