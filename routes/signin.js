require("dotenv").config();
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Users = require("../models/users");
const Pets = require("../models/pets");
const session = require("./session");

router.use(session);

router.get("/", function(req, res, next) {
	res.render("signin");
});

router.post("/", (req, res, next) => {
    const body = req.body;
    const plainPW = body.password;

    Users.find({email: body.email})
        .then((result) => {
            if (result.length) {
                const salt = result[0].salt;
                crypto.pbkdf2(plainPW, salt, 100000, 64, "sha512", (error, key) => {
                    if (key.toString("base64") == result[0].password) {
                        Pets.find({email: body.email})
                        .then((pet) => {
                            req.session.userId = body.email;
                            req.session.petName = pet[0].petName;
                            req.session.login = true; 
                            req.session.save();
                        });

                        res.send("<script>location.replace(\"/\")</script>");
                    }
                    else {
                        res.send("<script>alert(\"[ ===== FAIL ===== ] Password incorrect\"); location.replace(\"/signin\");</script>");
                    }
                });
            }
            else {
                res.send("<script>alert(\"[ ===== FAIL ===== ] No exist\"); location.replace(\"/signin\");</script>");
            }
        });
});

module.exports = router;