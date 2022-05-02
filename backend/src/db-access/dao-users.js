const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

async function find() {
    const db = await getDB();
    const users = await db.collection("users").find().toArray();
    return users;
}

async function findByID(id) {
    const db = await getDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    return user;
}

async function findByEmail(email) {
    const db = await getDB();
    const user = await db.collection("users").findOne({ userEmail: email });
    return user;
}

async function insert(user) {
    const db = await getDB();
    const newUser = await db.collection("users").insertOne(user);
    return newUser;
}

module.exports = {
    find,
    findByID,
    findByEmail,
    insert
}

