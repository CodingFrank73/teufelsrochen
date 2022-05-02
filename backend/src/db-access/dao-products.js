const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

async function find() {
    const db = await getDB();
    const products = await db.collection("products").find().toArray();
    return products;
}

async function findByID(id) {
    const db = await getDB();
    const product = await db.collection("product").findOne({ id: ObjectId(id) });
    return product;
}

async function insert(product) {
    const db = await getDB();
    const newProduct = await db.collection("product").insert(product);
    return newProduct;
}


module.exports = {
    find,
    findByID,
    insert
}