const { find } = require("../db-access/dao-users");

async function listAllUsers() {
    const users = await find();
    const listOfUsers = users.map(u => ({
        _id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        isAdmin: u.isAdmin,
        userEmail: u.userEmail,
        passwordHash: u.passwordHash,
        passwordSalt: u.passwordSalt,
        status: u.status,
        addDate: u.addDate,
        modifiedDate: u.modifiedDate
    }))

    return listOfUsers
}

module.exports = { listAllUsers }