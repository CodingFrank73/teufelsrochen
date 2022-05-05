const express = require("express");
const multer = require("multer");

const { UserService } = require("../use-cases");
const { count } = require("../db-access/dao-shared");

const userRouter = express.Router();

userRouter.get("/all", async (req, res) => {
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

userRouter.get("/single/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserService.showUser({ userID: id })
        res.json(user)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error during reading user." })
    }
})

userRouter.post("/login", async (req, res) => {
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

userRouter.post("/register",
    async (req, res) => {

        try {
            const userInfo = req.body;

            const user = await UserService.registerUser(userInfo);
            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Unknown error while registering new user." })
        }
    })

userRouter.post("/verifyAccount",
    async (req, res) => {

        try {
            const loginEmail = req.body.email;
            const verifyCode = req.body.verifyCode;

            const result = await UserService.verifyAccount({ loginEmail, verifyCode });
            res.status(200).json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({ err: { message: error.message } })
        }
    })


module.exports = {
    userRouter
}