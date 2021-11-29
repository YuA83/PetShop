const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Users = require("../models/users");
const Pets = require("../models/pets");
const Address = require("../models/address");

router.get("/", function(req, res, next) {
	res.render("signup");
});

router.post("/", (req, res, next) => {
    const body = req.body;
    const plainPW = body.password;
    console.log(body);

    crypto.randomBytes(64, (error, buf) => {
        const salt = buf.toString("base64");
        crypto.pbkdf2(plainPW, salt, 100000, 64, "sha512", (error, key) => {
            const chiperPW = key.toString("base64");
            const user = new Users({
                email: body.email,
                password: chiperPW,
                salt: salt,
                name: body.name
            });
            user.save();
        });

        const pet = new Pets({
            email: body.email,
            petName: body.petName,
            species: body.species,
            petBirth: body.petBirth
        });
        pet.save();

        const address = new Address({
            email: body.email,
            postcode: body.postcode,
            address: body.address,
            detailAddress: body.detailAddress,
            extraAddress: body.extraAddress,
            phone: body.phone
        });
        address.save();
    });

    res.send("<script>location.replace(\"/signin\")</script>");
});

router.post("/duplicate", (req, res, next) => {
    Users.find({email: req.body.email})
        .then((result) => {
            if (result.length)
                res.send("duplicate");
            else
                res.send("unique");
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;