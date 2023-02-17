const mysql = require('mysql2');
const conn  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'raidDB'
});

/*
 *  DOM-inspired setters and getters
 */

const getHangoutByID = (id) => {
    return null;
};

const getHangoutsByTitle = (title) =>  {
    return null;
};

const getHangoutsByDate = (day, month) => {
    return null;
};

// void
const addHangout = (title, day, month, sTime, eTime, desc, loc) => {

}
