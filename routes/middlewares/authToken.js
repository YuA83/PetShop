require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.params.token;
        console.log('안녕 난 토큰 파람!', clientToken);
        // const clientToken = req.cookies.token;
        const decoded = jwt.verify(clientToken, SECRET_KEY);

        if (decoded) {
            res.render("authConfirm", { userEmali: decoded.userId });
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