require("dotenv").config();
const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const Auth = require("../models//auth");
const crypto = require("crypto");
const emailAuth = require("./middlewares/mail");
const jwt = require("./middlewares/createToken");
const verifyToken = require("./middlewares/authToken");

router.get("/", (req, res, next) => {
	res.send("<script>location.replace(\"/\");</script>");
});

router.get("/email", (req, res, next) => {
    res.render("findEmail");
});

router.get("/password", (req, res, next) => {
    res.render("findPass");
});

router.post("/password", (req, res, next) => {
    const email = req.body.email;

    Users.find({email: email})
        .then((result) => {
            if (result.length) {
                const token = jwt.createToken(req);
                const hexNum = crypto.randomBytes(3).toString("hex");
                const auth = new Auth({
                    email: email,
                    hex: hexNum
                });
                
                auth.save();
                res.cookie("token", token);
                emailAuth.emailAuth(email, token, hexNum);

                res.send("<script>alert(\"[ SUCCESS ] 인증 이메일 발송\"); location.replace(\"/find/password\");</script>")
            }
            else {
                res.send("<script>alert(\"[ ===== FAIL ===== ] No exist\"); location.replace(\"/find/password\");</script>");
            }
        })
        .catch((error) => {
            console.log(error);
            res.send("<script>alert(\"[ ===== ERROR ===== ] MongoDB Error\"); location.replace(\"/find/password\");</script>");
        });
});

router.get("/:email/:token", verifyToken);

router.post("/authConfirm", (req, res, next) => {
    const authNum = req.body.auth;

    Auth.find({email: userEmail})
        .then((result) => {
            if (result.length) {
                if (result[0].hex == authNum)
                    res.send("<script>alert(\"[ ===== SUCCESS ===== ]\"); location.replace(\"/find/reset\");</script>");
                else
                    res.send("<script>alert(\"[ Wrong! ]\");</script>");
            }
            else {
                res.send("<script>alert(\"[ ===== ERROR ===== ] MongoDB Error\"); location.replace(\"/find/password\");</script>");
            }
        })
        .catch((error) => {
            console.log(error);
            res.send("<script>alert(\"[ ===== ERROR ===== ] MongoDB Error\"); location.replace(\"/find/password\");</script>");
        });
});

router.get("/reset", (req, res, next) => {
    res.render("resetPass");
});

router.post("/reset", (req, res, next) => {
    //  email을 찾아서 update...
});

module.exports = router;