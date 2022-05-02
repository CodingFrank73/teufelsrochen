
const { getRandomSalt, getHashedPassword } = require("../utils/security")

function createUserObject(
    { _id,
        firstName,
        lastName,
        isAdmin,
        userEmail,
        password,
        passwordHash,
        passwordSalt,
        status,
        addDate,
        modifiedDate }) {

    if (typeof firstName !== "string" || firstName.trim().length === 0) {
        throw new Error("Der Vorname ist ein Pflichtfeld")
    }

    if (!passwordHash && !password) {
        throw new Error("Password oder PasswordHash erforderlich")
    }

    const _pwSalt = passwordSalt || getRandomSalt;

    return {
        _id,
        firstName,
        lastName,
        isAdmin: isAdmin || false,
        userEmail,
        passwordHash: passwordHash || getHashedPassword(password, _pwSalt),
        passwordSalt: _pwSalt,
        status: status || "enabled",
        addDate: addDate || Date.now(),
        modifiedDate: modifiedDate || Date.now(),
    }
}

module.exports = {
    createUserObject
}
