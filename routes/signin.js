const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Users = require("../models/users");

router.get("/", function(req, res, next) {
	res.render("signin");
});

router.post("/", (req, res, next) => {
    const body = req.body;
    const plainPW = body.password;

    Users.find({email: body.email})
        .then((result) => {
            if (result == "") {
                console.log("해당 계정 없음");
            }
            else {
                const salt = result[0].salt;
                crypto.pbkdf2(plainPW, salt, 100000, 64, "sha512", (error, key) => {
                    if (key.toString("base64") == result[0].password) {
                        console.log("로그인 성공");
                    }
                    else {
                        console.log("로그인 실패");
                    }
                });
            }
        })
});

module.exports = router;