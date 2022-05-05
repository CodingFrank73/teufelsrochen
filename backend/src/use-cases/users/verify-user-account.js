const { UserDAO } = require("../../db-access");
const { createUser } = require("../../domain/User");

async function verifyAccount({ loginEmail, verifyCode }) {
    const foundUser = await UserDAO.findByEmail(loginEmail);
    if (!foundUser) {
        throw new Error("Bei der Verifizierung deines Accounts gab es ein Problem")
    }

    const user = createUser(foundUser);

    const isVerifyCodeOK = user.sixDigitVerificationCode === verifyCode;
    if (!isVerifyCodeOK) {
        throw new Error("Bei der Verifizierung deines Accounts gab es ein Problem")
    }

    const updateResult = await UserDAO.update(user._id, { emailVerified: true })
    const emailVerified =
        updateResult.acknowledged === true &&
        updateResult.matchedCount === 1 &&
        updateResult.modifiedCount === 1

    if (!emailVerified) {
        throw new Error("Scheinbar gibt es ein Problem bei der Verifizierung... Ist der Account bereits verifiziert?")
    }

    return {}
}

module.exports = {
    verifyAccount
}