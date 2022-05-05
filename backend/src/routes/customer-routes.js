const express = require("express");
const multer = require("multer");

const { CustomerService } = require("../use-cases");
const { count } = require("../db-access/dao-shared");

const { doAuthMiddleware } = require("../auth/auth-middleware");

const customerRouter = express.Router();

//---------- Authentication Required -----------------
customerRouter.get("/all",
    // doAuthMiddleware,
    async (req, res) => {

        try {
            const customers = await CustomerService.listAllCustomers();
            res.status(200).json(customers)

        } catch (error) {
            res.status(500).json({ err: error.message || "Unknown error during reading customers" });
        }
    })

customerRouter.get("/single/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const customer = await CustomerService.showCustomer({ customerID: id });
        res.status(200).json(customer)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error during reading customer." })
    }
})

customerRouter.get("/count", async (req, res) => {
    try {
        const value = await count("customers");
        res.json(value)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || `Unknown error while counting customers.` })
    }
})

customerRouter.post("/register", async (req, res) => {
    try {
        const customerInfo = req.body;

        const customer = await CustomerService.registerCustomer(customerInfo);
        res.status(201).json(customer)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error.message } })
    }
})

customerRouter.post("/verifyEmail", async (req, res) => {
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

module.exports = {
    customerRouter
}