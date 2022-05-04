const { CustomerDAO } = require("../../db-access")

async function showCustomer({ customerID }) {

    const customer = await CustomerDAO.findByID(customerID)
    return customer
}

module.exports = {
    showCustomer
}