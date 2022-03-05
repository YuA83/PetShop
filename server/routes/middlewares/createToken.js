require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES = "1m";

const createToken = (req) => {
    const body = req.body
    const token = jwt.sign(
        { userId: body.email },
        SECRET_KEY,
        { expiresIn: EXPIRES }
    );

    return token;
}

module.exports = { createToken };