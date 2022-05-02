const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");

const PORT = process.env.PORT || 9000;
const app = express();

const { addProduct } = require("./use-cases/add-product");
const { listAllCustomers } = require("./use-cases/list-all-customers");
const { listAllProducts } = require("./use-cases/list-all-products");
const { listAllUsers } = require("./use-cases/list-all-users");
const { imageBufferToBase64 } = require("./utils/converter");
const { loginUser } = require("./use-cases/users/login-user");
const { registerUser } = require("./use-cases/users/register-user");
const { count } = require("./db-access/dao-shared");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("it works....")
})


// ------------------- customers --------------------
app.get("/api/customers/all", async (req, res) => {

    try {
        const customers = await listAllCustomers();
        res.json(customers)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error during reading customers" });
    }
})

app.get("/api/customers/count", async (req, res) => {
    try {
        const value = await count("customers");
        res.json(value)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || `Unknown error while counting customers.` })
    }
})


// -------------------- products --------------------
app.get("/api/products/all", async (req, res) => {

    try {
        const products = await listAllProducts();
        res.json(products)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading products" });
    }
})

app.post("/api/products/add", async (req, res) => {

    try {
        const newProductInformations = req.body;

        const imageLink = imageBufferToBase64(req.file.buffer, req.file.mimetype);

        // const variations = JSON.parse(newProductInformations.variations)
        // const product = await addProduct({ ...newProductInformations, variations, imageLink })

        const product = await addProduct({ ...newProductInformations, imageLink })
        res.json(product)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while adding a new product." })
    }
})


// --------------------- orders ---------------------

// ---------------------- users ---------------------
app.get("/api/users/all", async (req, res) => {
    try {
        const foundUsers = await listAllUsers();
        const users = await foundUsers.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            userEmail: user.userEmail,
            status: user.status,
            addDate: user.addDate,
            modifiedDate: user.modifiedDate
        }))

        res.json(users)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading users" })
    }
})

app.post("/api/users/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const token = await loginUser({ email, password });
        res.json(token);

    } catch (error) {
        console.log(error)
        res.status(404).json({ err: "Not found." })
    }
})

app.post("/api/users/add", async (req, res) => {
    try {
        const userInfo = req.body;

        console.log(userInfo);

        const user = await registerUser(userInfo);
        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Unknown error while registering new user." })
    }
})

// --------------------- shared ---------------------



app.listen(PORT, () => console.log("Server listen on port: ", PORT));



