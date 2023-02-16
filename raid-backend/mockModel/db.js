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