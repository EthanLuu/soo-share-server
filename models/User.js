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
    roleNumber: {
        type: Number,
        required: true,
        default: 1
    },
    email: {
        type: String,
        default: ""
    },
    token: String
});

module.exports = mongoose.model("users", UserSchema);
