
function createProductObject(
    { _id,
        productNumber,
        title,
        description,
        imageURL,
        price,
        stockCount,
        from,
        supplierID,
        addDate }) {

    return {
        _id,
        productNumber,
        title: title || "Neues Produkt",
        description,
        imageURL: imageURL || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
        price,
        stockCount,
        from,
        supplierID,
        addDate: addDate || Date.now
    }
}

module.exports = {
    createProductObject
}