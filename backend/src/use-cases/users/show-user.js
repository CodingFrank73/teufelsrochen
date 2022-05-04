const { findByID } = require("../../db-access/dao-users");

async function showUser({ userID }) {
    const foundUser = await findByID(userID);
    return foundUser
}

module.exports = {
    showUser
}