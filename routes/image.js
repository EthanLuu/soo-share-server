const express = require("express");
const qnconfig = require("../config");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/token", auth, (req, res) => {
    const token = qnconfig.uploadToken;
    res.send({ token: token });
});

module.exports = router;
