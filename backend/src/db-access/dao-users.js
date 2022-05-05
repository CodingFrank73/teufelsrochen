const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

const collectionName = "users";

async function find() {
    const db = await getDB();
    const users = await db.collection(collectionName).find().toArray();
    return users;
}

async function findByID(id) {
    const db = await getDB();
    const user = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return user;
}

async function findByEmail(email) {
    const db = await getDB();
    const user = await db.collection(collectionName).findOne({ loginEmail: email });
    return user;
}

async function insert(user) {
    const db = await getDB();
    const newUser = await db.collection(collectionName).insertOne(user);
    return newUser;
}

async function update(userId, updateInfo) {
    const db = await getDB();
    const updateResult = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateInfo }
    )

    return updateResult
}

module.exports = {
    find,
    findByID,
    findByEmail,
    insert,
    update
}

