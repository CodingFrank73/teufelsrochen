const { find } = require("../db-access/dao-customers");

async function listAllCustomers() {

    const customers = await find();
    const listOfCustomers = customers.map(c => ({
        _id: c._id,
        gender: c.gender,
        firstName: c.firstName,
        lastName: c.lastName,
        address: c.address,
        postalCode: c.postalCode,
        city: c.city,
        country: c.country,
        dateOfBirth: c.dateOfBirth,
        isActivated: c.isActivated,
        loginEmail: c.loginEmail,
        pwHash: c.pwHash,
        salt: c.salt,
        contacts: c.contacts,
        addDate: c.addDate,
        lastChangeAt: c.lastChangeAt
    }))

    return listOfCustomers

}

module.exports = { listAllCustomers }