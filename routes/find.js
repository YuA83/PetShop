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
                /*
                https://techlog.io/Server/Node-js/node-js%EC%97%90%EC%84%9C-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%B4%88%EA%B8%B0%ED%99%94-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/
                
                */
            }
        })

});

module.exports = router;