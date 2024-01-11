const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'raid-user',
    password: 'raiduser-0000',
    database: 'raid'
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database connected.");
    }
});

module.exports = conn;