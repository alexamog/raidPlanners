const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: '10.5.0.7',
    user: 'root',
    password: 'example',
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