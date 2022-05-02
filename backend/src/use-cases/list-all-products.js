const { find } = require("../db-access/dao-products");

async function listAllProducts() {
    const products = await find();
    const listOfProducts = products.map(p => ({
        _id: p._id,
        productNumber: p.productNumber,
        title: p.title,
        description: p.description,
        imageURL: p.imageURL,
        price: p.price,
        stockCount: p.stockCount,
        from: p.from,
        supplierID: p.supplierID,
        addDate: p.addDate
    }))

    return listOfProducts
}

module.exports = { listAllProducts }