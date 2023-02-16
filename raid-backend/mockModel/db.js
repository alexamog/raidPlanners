const database = [
    {
        "id": "1",
        "username": "bleulenny",
        "email": "aamog@my.bcit.ca",
        "password": "123",
        "firstName": "Alex",
        "lastName": "Amog"
    },
    {
        "id": "2",
        "username": "bryancampos",
        "email": "bryancampos@gmail.com",
        "password": "123",
        "firstName": "Bryan",
        "lastName": "Campos"
    },
    {
        "id": "165897917004120064",
        "profilePicture": "2795e49b4d786de5cf5953cf592c1b4f",
        "username": "Lenny",
        "discriminator": "8080"
    },
]

const userModel = {
    findOne: (email) => {
        const user = database.find((user) => user.email === email);
        if (user) {
            return user;
        }
        return new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
        const user = database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        return new Error(`Couldn't find user with id: ${id}`);
    }
};

module.exports = { database, userModel };