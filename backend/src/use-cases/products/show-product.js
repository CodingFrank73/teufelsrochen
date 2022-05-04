const { findByID } = require("../../db-access/dao-products");

async function showProduct({ productID }) {

    const foundProduct = await findByID(productID)
    return foundProduct
}

module.exports = {
    showProduct
}