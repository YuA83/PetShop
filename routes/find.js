const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Users = require("../models/users");

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
                const token = crypto.randomBytes(20).toString("hex");
                const data = {
                    token,
                    ttl: 300 // Time-To-Live, 5m
                };
            }
        })

});

module.exports = router;