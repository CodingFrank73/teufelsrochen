const { findByEmail } = require("../../db-access/dao-users");
const { createUserObject } = require("../../domain/User");
const hash = require("../../utils/security");


async function loginUser({ email, password }) {

    const invalidLoginMessage = "Invalid login";

    const found = await findByEmail(email);

    if (!found) {
        throw new Error(invalidLoginMessage);
    }

    const user = createUserObject(found);
    const passwordHash = hash.getHashedPassword(password, user.passwordSalt)
    const correctPassword = user.passwordHash === passwordHash;

    if (!correctPassword) {
        throw new Error(invalidLoginMessage)
    }

    const token = hash.getToken(user)
    return token
}

module.exports = {
    loginUser
}