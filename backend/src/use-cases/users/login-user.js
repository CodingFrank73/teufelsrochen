const { UserDAO } = require("../../db-access")
const { createUser } = require("../../domain/User");
const hash = require("../../utils/security");


async function loginUser({ email, password }) {

    const invalidLoginMessage = "Login fehlgeschlagen";

    const found = await UserDAO.findByEmail(email);

    if (!found) {
        throw new Error(invalidLoginMessage);
    }

    const user = createUser(found);
    const passwordHash = hash.createHashedPassword(password, user.salt)
    const isValidPassword = user.pwHash === passwordHash;

    if (!isValidPassword) {
        throw new Error(invalidLoginMessage)
    }

    if (!user.emailVerified) {
        throw new Error("Bitte Account verifizieren - siehe Email mit Freischaltcode")
    }

    const token = hash.createToken(user, "access", Number(process.env.LIFETIME_TOKEN_ACCESS))
    const refreshToken = hash.createToken(user, "refresh", Number(process.env.LIFETIME_TOKEN_REFRESH))

    return { token, refreshToken }
}

module.exports = {
    loginUser
}