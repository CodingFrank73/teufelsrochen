const moment = require("moment");

function createCustomerObject(
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
        pwHash,
        salt,
        contacts,
        addDate,
        lastChangeAt }) {

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
        pwHash,
        salt,
        contacts,
        addDate: addDate || moment().local().format("DD.MM.YYYY, HH:mm"),
        lastChangeAt: lastChangeAt
    }
}

module.exports = {
    createCustomerObject
}