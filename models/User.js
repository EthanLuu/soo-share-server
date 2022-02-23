const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    roleNumer: {
        type: Number,
        required: true,
        default: 1
    },
    token: String
});

module.exports = mongoose.model("users", UserSchema);
