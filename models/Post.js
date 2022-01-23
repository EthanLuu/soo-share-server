const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    link: String,
    userName: String,
    date: {
        type: Date,
        default: Date.now
    },
    tag: String
});

module.exports = mongoose.model("posts", PostSchema);
