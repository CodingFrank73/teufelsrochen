const moment = require("moment");

function createCustomer(
    { _id,
        gender,
        firstName,
        lastName,
        address,
        postalCode,
        city,
        country,
        dateOfBirth,
        isActivated,
        loginEmail,
        emailVerified = false,
        pwHash,
        salt,
        sixDigitVerificationCode,
        contacts,
        addDate,
        lastChangeAt }) {

    if (!loginEmail) {
        throw new Error("Email-Adresse muss vorhanden sein.")
    }

    return {
        _id,
        gender,
        firstName,
        lastName,
        address,
        postalCode,
        city,
        country,
        dateOfBirth,
        isActivated: isActivated || true,
        loginEmail,
        emailVerified,
        pwHash,
        sixDigitVerificationCode,
        salt,
        contacts,
        addDate: addDate || moment().local().format("DD.MM.YYYY, HH:mm"),
        lastChangeAt: lastChangeAt
    }
}

module.exports = {
    createCustomer
}