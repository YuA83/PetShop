const express = require("express");
const router = express.Router();
const session = require("./session");
router.use(session);

router.get('/',(req,res)=>{
    const userId = req.session.userId;
    const petName = req.session.petName;
    const login = req.session.login;

    res.render("header",
    {
        userId: userId,
        petName: petName,
        login: login
    });
});

module.exports = router;