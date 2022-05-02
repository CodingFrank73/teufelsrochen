const jwt = require("jsonwebtoken");

function doAuthMiddleware(req, res, next) {
    const token = req.headers.token;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT_Secret)
        req.userClaims = tokenPayload
        next()

    } catch (error) {
        console.log("error while verifying token", error);
        return res.status(401).json({ message: "please login first" })
    }
}

module.exports = {
    doAuthMiddleware
}