const express = require("express");
const multer = require("multer");

const { ProductService } = require("../use-cases");

const { imageBufferToBase64 } = require("../utils/converter");

const productRouter = express.Router();

productRouter.get("/all", async (req, res) => {

    try {
        const products = await ProductService.listAllProducts();
        res.json(products);

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading products" });
    }
})

productRouter.get("/single/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const product = await ProductService.showProduct({ productID: id });
        res.json(product);

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading the selected product" });
    }
})

productRouter.post("/add", async (req, res) => {

    try {
        const newProductInformations = req.body;

        const imageLink = imageBufferToBase64(req.file.buffer, req.file.mimetype);

        // const variations = JSON.parse(newProductInformations.variations)
        // const product = await addProduct({ ...newProductInformations, variations, imageLink })

        const product = await ProductService.addProduct({ ...newProductInformations, imageLink })
        res.json(product)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while adding a new product." })
    }
})







module.exports = {
    productRouter
}