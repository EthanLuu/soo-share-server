const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    keywords: String,
    link: String,
    userName: String,
    date: {
        type: Date,
        default: Date.now
    },
    tag: String
});

PostSchema.index({ keywords : 'text', userName : 'text' })

module.exports = mongoose.model("posts", PostSchema);
