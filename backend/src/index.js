const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");

const PORT = process.env.PORT || 9000;
const app = express();

const { CustomerService, ProductService, UserService } = require("./use-cases");

const { imageBufferToBase64 } = require("./utils/converter");
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
        const customers = await CustomerService.listAllCustomers();
        res.status(200).json(customers)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error during reading customers" });
    }
})

app.get("/api/customers/single/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const customer = await CustomerService.showCustomer({ customerID: id });
        res.status(200).json(customer)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error during reading customer." })
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

app.post("/api/customers/register", async (req, res) => {
    try {
        const customerInfo = req.body;
        console.log(customerInfo);

        const customer = await CustomerService.registerCustomer(customerInfo);
        res.status(201).json(customer)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error.message } })
    }
})

app.post("/api/customers/verifyEmail", async (req, res) => {
    try {
        const loginEmail = req.body.email;
        const sixDigitCode = req.body.sixDigitCode;
        const result = await CustomerService.verifyCustomerEmail({ loginEmail, sixDigitCode });
        res.status(200).json(result);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error.message } })
    }
})

// -------------------- products --------------------
app.get("/api/products/all", async (req, res) => {

    try {
        const products = await ProductService.listAllProducts();
        res.json(products);

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading products" });
    }
})

app.get("/api/products/single/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const product = await ProductService.showProduct({ productID: id });
        res.json(product);

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading the selected product" });
    }
})

app.post("/api/products/add", async (req, res) => {

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


// --------------------- orders ---------------------

// ---------------------- users ---------------------
app.get("/api/users/all", async (req, res) => {
    try {
        const foundUsers = await UserService.listAllUsers();
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

app.get("/api/users/single/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserService.showUser({ userID: id })
        res.json(user)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error during reading user." })
    }
})

app.post("/api/users/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const token = await UserService.loginUser({ email, password });
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

        const user = await UserService.registerUser(userInfo);
        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Unknown error while registering new user." })
    }
})

// --------------------- shared ---------------------



app.listen(PORT, () => console.log("Server listen on port: ", PORT));



