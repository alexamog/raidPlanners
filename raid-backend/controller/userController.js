const { userModel } = require("../mockModel/db");

const getUserByEmailIdAndPassword = (email, password) => {
    let user = userModel.findOne(email);
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};
const getUserById = (id) => {
    let user = userModel.findById(id);
    if (user) {
        return user;
    }
    return null;
};


const isUserValid = (user, password) => {
    return user.password === password;
}

module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
};