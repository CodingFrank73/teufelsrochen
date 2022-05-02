const daoUser = require("../../db-access/dao-users");
const domainUser = require("../../domain/User");

async function registerUser(userInfo) {
    const foundUser = await daoUser.findByEmail(userInfo.email)

    console.log(foundUser);
    if (foundUser) {
        throw { message: "Benutzer mit der Email - " + userInfo.email + " - existiert bereits" }
    }

    const user = domainUser.createUserObject(userInfo);
    const result = await daoUser.insert(user);
    return result
}

module.exports = {
    registerUser
}