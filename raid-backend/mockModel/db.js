const database = []

const userModel = {
    findById: (id) => {
        const user = database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        return null;
    },

    addUser: (profile) => {
        database.push({
            id: profile.id,
            profilePicture: profile.avatar,
            username: profile.username,
            discriminator: profile.discriminator
        })
    }
};

module.exports = { database, userModel };