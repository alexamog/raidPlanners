const { userModel } = require("../mockModel/db");
const conn = require("../db-conn");
const getUserById = (id) => {
    const user = userModel.findById(id)
    return user;
}
const getUserByIdOrAdd = (profile) => {
    let user = userModel.findById(profile.id);
    if (user) {
        return user;
    }
    userModel.addUser(profile)
    user = userModel.findById(profile.id);
    return user;

};

const adduser = async (profile) =>{
    const preparedStatement = "INSERT INTO users(`user_id`, `user_name`, `user_avatar`,`user_discriminator`) VALUES (?,?,?,?)";
    const userVals = [profile.id,profile.username,profile.avatar,profile.discriminator];

    return await conn.promise().query(preparedStatement,userVals)
}

const findUser = async (id) =>{
    const preparedStatement = "SELECT * FROM users WHERE user_id = ?";
    return await conn.promise().query(preparedStatement,id).then((result)=> JSON.stringify(result)).then((result)=>JSON.parse(result)[0][0])
}

module.exports = {
    getUserByIdOrAdd,
    getUserById,
    findUser,
    adduser
};