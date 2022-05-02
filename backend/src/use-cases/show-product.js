const { findByID } = require("../db-access/dao-products");

async function showProduct({ productID }) {

    const product = await findByID(productID)
}