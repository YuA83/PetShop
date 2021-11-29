const express = require("express");
const router = express.Router();
const verifyToken = require("./middlewares/authToken");

router.get("/", (req, res, next) => {
	res.render("index");
});

// 토큰 인증하는 방식 예시
// router.get("/", verifyToken, (req, res, next) => {
// 	res.render("index");
// });

module.exports = router;