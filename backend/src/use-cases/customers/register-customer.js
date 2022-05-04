const { CustomerDAO } = require("../../db-access");
const { createCustomer } = require("../../domain/Customer");
const { getRandomSalt, getHashedPassword, generateRandomSixDigitCode } = require("../../utils/security");
const { sendEmail } = require("../../utils/sendEmail");


async function registerCustomer({ firstName, lastName, loginEmail, password }) {
    const foundCustomer = await CustomerDAO.findByLoginEmail(loginEmail);

    if (foundCustomer) {
        const errorMessage = "Ein Account mit dieser Email-Adresse existiert bereits"
        throw new Error(errorMessage)
    }

    const salt = getRandomSalt();
    const pwHash = getHashedPassword(password, salt);

    const sixDigitVerificationCode = generateRandomSixDigitCode();

    const customer = createCustomer({ firstName, lastName, loginEmail, pwHash, salt, sixDigitVerificationCode });
    const insertResult = await CustomerDAO.insert(customer);

    const isRegSuccessfully = insertResult.acknowledged === true && insertResult.insertedId;
    if (!isRegSuccessfully) {
        throw new Error("Registrierung fehlgeschlagen, bitte nochmals versuchen...")
    }

    await sendVerificationEmail(customer)

    const registeredCustomer = await CustomerDAO.findByID(insertResult.insertedId);
    return registeredCustomer
}

async function sendVerificationEmail(customer) {
    return await sendEmail({
        to: customer.loginEmail,
        subject: "Willkommen beim Teufelsrochen FischShop",
        message: `
            Hallo ${customer.firstName}!

            Wir freuen uns dich auf unserer Seite begrüßen zu dürfen.

            Bevor es losgehen kann, verifiziere bitte erst einmal deinen Account mit dem Code in dieser Email.

            <h1>${customer.sixDigitVerificationCode}</h1>

            Viel Spaß beim shopping!

            Dein Teufelsrochen Team
        `
    })
}


module.exports = {
    registerCustomer
}