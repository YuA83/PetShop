require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.params.token;
        // const clientToken = req.cookies.token;
        const decoded = jwt.verify(clientToken, SECRET_KEY);

        if (decoded) {
            res.locals.userEmail = decoded.userId;
            res.render("authConfirm");
            // res.locals.userId = decoded.userId;
            // res.locals.petName = decoded.petName;
            // res.send(decoded.userId);
        }
        else {
            res.send("<script>alert(\"[ ERROR ] Unauthorized\"); location.replace(\"/find/password\");</script>");
        }
    } catch (error) {
        res.send("<script>alert(\"[ ERROR ] Token Expired\"); location.replace(\"/find/password\");</script>");
    }
}

module.exports = verifyToken;