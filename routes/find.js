require("dotenv").config();
const express = require("express");
const router = express.Router();
const Users = require("../models/users");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.SECRET_KEY;

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
                /*
                const token = jwt.sign(
                    { userId: email },
                    SECRET_KEY,
                    { expiresIn: EXPIRES }
                );
                res.cookie("token", token);
                */
                /*    
                const token = crypto.randomBytes(20).toString("hex");
                const data = {
                    token,
                    userId: email,
                    ttl: 300 // Time-To-Live, 5m
                };
                */
            }
        })
        .catch((error) => {

        });
});

module.exports = router;