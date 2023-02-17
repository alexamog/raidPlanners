const mysql = require('mysql2');
const conn  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'raidDB'
});

const Hangout = (title, sDT, eDT, desc, loc) => {
    this.title = title;
    this.sDT   =   sDT;
    this.eDT   =   eDT;
    this.desc  =  desc;
    this.loc   =   loc;
}

/**
 *  DOM-inspired setters and getters
 */

/** 
 * gets a hangout object by id
 * 
 * @param {string} id 
 * @returns {Hangout} A hangout object of the matching ID
 */
const getHangoutByID = async (id) =>  {
    const [rows, fields] = await conn.execute("select * from `hangouts` where `id` = ?", [id])
    const result = Hangout(fields);
    
    return result;
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
