const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
    email: String,
    code: String,
    expire_time: Date
});

module.exports = mongoose.model("verifications", LikeSchema);
