const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Users = require("../models/users");

router.get("/", function(req, res, next) {
	res.render("signup");
});

router.post("/", (req, res, next) => {
    const body = req.body;
    const plainPW = body.password;

    crypto.randomBytes(64, (error, buf) => {
        const salt = buf.toString("base64");
        crypto.pbkdf2(plainPW, salt, 100000, 64, "sha512", (error, key) => {
            const chiperPW = key.toString("base64");
            const user = new Users({
                email: body.email,
                password: chiperPW,
                salt: salt,
                name: body.name,
                petName: body.petName,
                species: body.species,
                petBirth: body.petBirth
            });
            user.save();
        });
    });
});

module.exports = router;