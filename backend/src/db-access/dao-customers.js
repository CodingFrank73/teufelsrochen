const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");
const collectionName = "customers";

async function find() {
    const db = await getDB();
    const customers = await db.collection("customers").find().toArray();
    return customers;
}

async function findByID(id) {
    const db = await getDB();
    const customer = await db.collection("customers").findOne({ _id: new ObjectId(id) });
    return customer;
}

async function findByEmail(email) {
    const db = await getDB();
    const customer = await db.collection("customers").findOne({ email: email });
    return customer;
}

async function insert(customer) {
    const db = await getDB();
    const newCustomer = await db.collection("customers").insertOne(customer);
    return newCustomer;
}


module.exports = {
    find,
    findByID,
    findByEmail,
    insert
}

