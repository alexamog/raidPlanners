const { userModel } = require("../mockModel/db");

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

module.exports = {
    getUserByIdOrAdd,
    getUserById
};