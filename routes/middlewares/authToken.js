// using JWT

require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, SECRET_KEY);

        if (decoded) {
            console.log(decoded);
            res.locals.userId = decoded.userId;
            res.locals.petName = decoded.petName;
            res.send(decoded.userId);
        }
        else {
            res.send("<script>alert(\"[ ERROR ] unauthorized\"); location.replace(\"/signin\");</script>");
        }
    } catch (error) {
        res.send("<script>alert(\"[ ERROR ] toeken expired\"); location.replace(\"/signin\");</script>");
    }
}

module.exports = verifyToken;