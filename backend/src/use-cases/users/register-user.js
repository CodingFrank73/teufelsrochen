const { UserDAO } = require("../../db-access");
const { createUser } = require("../../domain/User");
const Security = require("../../utils/security");
const { sendEmail } = require("../../utils/sendEmail");

async function registerUser({ firstName, lastName, loginEmail, password }) {
    const foundUser = await UserDAO.findByEmail(loginEmail)

    if (foundUser) {
        throw new Error("Ein Account mit dieser Email-Adresse besteht bereits")
    }

    const salt = Security.getRandomSalt();
    const pwHash = Security.getHashedPassword(password, salt);
    const verifyCode = Security.generateRandomSixDigitCode();

    const user = await createUser({ firstName, lastName, loginEmail, pwHash, salt, sixDigitVerificationCode: verifyCode });
    const insertResult = await UserDAO.insert(user);

    const isRegSuccessfully =
        insertResult.acknowledged === true &&
        insertResult.insertedId;

    if (!isRegSuccessfully) {
        throw new Error("Registrierung fehlgeschlagen, bitte nochmals versuchen...")
    }

    await sendVerificationEmail(user)

    const registeredUser = await UserDAO.findByID(insertResult.insertedId);
    return registeredUser
}

async function sendVerificationEmail(user) {
    return await sendEmail({
        to: user.loginEmail,
        subject: "Herzlich Willkommen im Teufelsrochen Team",
        message: `
            Hallo ${user.firstName}!

            Wir freuen uns dich als neues Team-Mitglied begrüßen zu dürfen.

            Bevor es losgehen kann, verifiziere bitte erst einmal deinen Account mit dem Code in dieser Email.

            Wenn Du Hilfestellung bei der Einrichtung deines Email-Accounts benötigst, bitte
            zögere nicht uns zu kontaktieren.

            <h1>${user.sixDigitVerificationCode}</h1>

            Viel Spaß!
            Deine IT-Abteilung
        `
    })
}

module.exports = {
    registerUser
}