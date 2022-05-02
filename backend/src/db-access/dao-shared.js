
const { getDB } = require("./db-connector");

async function count(collectionName) {
    const db = await getDB();
    const value = await db.collection(collectionName).find().count();
    return value
}

module.exports = {
    count
}