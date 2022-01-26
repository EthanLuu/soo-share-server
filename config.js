const qiniu = require("qiniu");

const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
    scope: "ethanlu"
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = { uploadToken };
