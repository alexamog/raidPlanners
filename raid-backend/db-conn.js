const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'raid-user',
    password: process.env.DB_PASSWORD || 'raiduser-0000',
    database: process.env.DB_NAME || 'raid'
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