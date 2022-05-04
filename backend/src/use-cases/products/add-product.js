const { insertOne } = require("../../db-access/dao-products");
const { createProductObject } = require("../../domain/Product");

async function addProduct(newProductInformations) {
    const product = createProductObject(newProductInformations);

    const newProductObject = await insertOne(product);
    return newProductObject
}

module.exports = {
    addProduct
}