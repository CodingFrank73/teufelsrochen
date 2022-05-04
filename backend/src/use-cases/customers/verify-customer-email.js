const { CustomerDAO } = require("../../db-access");
const { createCustomer } = require("../../domain/Customer");

async function verifyCustomerEmail({ loginEmail, sixDigitCode }) {
    const foundCustomer = await CustomerDAO.findByLoginEmail(loginEmail)
    if (!foundCustomer) {
        throw new Error("Beim verifizieren mit dem 6-Stelligen Code gab es ein Problem")
    }

    const customer = createCustomer(foundCustomer);

    const isSixDigitCodeOk = customer.sixDigitVerificationCode === sixDigitCode;
    if (!isSixDigitCodeOk) {
        throw new Error("Beim verifizieren mit dem 6-Stelligen Code gab es ein Problem")
    }

    const updateResult = await CustomerDAO.update(customer._id, { emailVerified: true })
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
    verifyCustomerEmail
}