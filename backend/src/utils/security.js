const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function getRandomSalt() {
    return crypto.randomBytes(64).toString('hex');
}

function getHashedPassword(password, salt) {
    return hash(password + salt)
}

function getToken(user) {
    const TEN_MINUTES = 60 * 10;
    const inititedAt = Math.floor(Date.now() / 1000);
    const expiresAt = inititedAt + TEN_MINUTES;

    const tokenPayload = {
        sub: user._id,
        tokenTypen: "access",
        iat: inititedAt,
        exp: expiresAt
    }

    return jwt.sign(tokenPayload, process.env.JWT_SECRET)
}

function generateRandomSixDigitCode() {
    return Math.random().toString().slice(2, 8)
}

module.exports = {
    getRandomSalt,
    getHashedPassword,
    getToken,
    generateRandomSixDigitCode,
    hash
}