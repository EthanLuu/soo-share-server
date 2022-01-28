const express = require("express");
const qiniu = require("qiniu");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/token", auth, (req, res) => {
    const accessKey = process.env.ACCESS_KEY;
    const secretKey = process.env.SECRET_KEY;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: "ethanlu"
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    res.send({ token: uploadToken });
});

module.exports = router;
