
const moment = require("moment");

function createUser(
    { _id,
        firstName,
        lastName,
        isAdmin,
        loginEmail,
        emailVerified = false,
        pwHash,
        salt,
        sixDigitVerificationCode,
        isActivated,
        addDate,
        lastChangeAt }) {

    if (typeof firstName !== "string" || firstName.trim().length === 0) {
        throw new Error("Der Vorname ist ein Pflichtfeld")
    }

    if (typeof lastName !== "string" || lastName.trim().length === 0) {
        throw new Error("Der Nachname ist ein Pflichtfeld")
    }

    if (!pwHash) {
        throw new Error("Password oder PasswordHash erforderlich")
    }

    if (!loginEmail) {
        throw new Error("Email-Adresse muss vorhanden sein.")
    }

    return {
        _id,
        firstName,
        lastName,
        isAdmin: isAdmin || false,
        loginEmail,
        emailVerified,
        pwHash,
        salt,
        sixDigitVerificationCode,
        isActivated: isActivated || "true",
        addDate: addDate || moment().local().format("DD.MM.YYYY, HH:mm"),
        lastChangeAt: lastChangeAt
    }
}

module.exports = {
    createUser
}
