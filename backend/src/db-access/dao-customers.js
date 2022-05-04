const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");
const collectionName = "customers";

async function find() {
    const db = await getDB();
    const allCustomers = await db.collection("customers").find().toArray();
    return allCustomers;
}

async function findByID(id) {
    const db = await getDB();
    const foundCustomer = await db.collection("customers").findOne({ _id: new ObjectId(id) });
    return foundCustomer;
}

async function findByEmail(email) {
    const db = await getDB();
    const foundCustomer = await db.collection("customers").findOne({ email: email });
    return foundCustomer;
}
async function findByLoginEmail(email) {
    const db = await getDB();
    const foundCustomer = await db.collection("customers").findOne({ loginEmail: email });
    return foundCustomer;
}

async function insert(customer) {
    const db = await getDB();
    const newCustomer = await db.collection("customers").insertOne(customer);
    return newCustomer;
}

async function update(customerId, updateInfo) {
    const db = await getDB();
    const updateResult = await db.collection("customers").updateOne(
        { _id: new ObjectId(customerId) },
        { $set: updateInfo }
    )

    return updateResult
}


module.exports = {
    find,
    findByID,
    findByEmail,
    findByLoginEmail,
    insert,
    update
}

